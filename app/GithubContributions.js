async function fetchContributionYear(username, from, to, alias) {
  const token = process.env.GITHUB_TOKEN_NEW;
  if (!token) {
    return null;
  }

  const query = `query($login:String!, $from:DateTime!, $to:DateTime!) {
    user(login: $login) {
      ${alias}: contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }`;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from,
        to,
      },
    }),
    cache: 'force-cache',
  });

  if (!response.ok) {
    return null;
  }

  const { data } = await response.json();
  if (!data?.user?.[alias]?.contributionCalendar) {
    return null;
  }

  return data.user[alias].contributionCalendar;
}

function formatMonthLabels(weeks) {
  const labels = [];
  let lastMonth = '';

  weeks.forEach((week) => {
    const monthName = new Date(week.contributionDays[0].date).toLocaleString('default', { month: 'short' });
    if (monthName !== lastMonth) {
      labels.push(monthName);
      lastMonth = monthName;
    } else {
      labels.push('');
    }
  });

  return labels;
}

export default async function GitHubContributions({ username }) {
  const currentYear = new Date().getUTCFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  const yearRanges = years.map((year) => ({
    year,
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  }));

  const calendars = await Promise.all(
    yearRanges.map(async ({ year, from, to }) => {
      const alias = `year${year}`;
      const calendar = await fetchContributionYear(username, from, to, alias);
      return { year, calendar };
    })
  );

  const hasData = calendars.some((entry) => entry.calendar);

  return (
    <div className="contributions-card">
      <div className="contributions-header">
        <div>
          <h3>GitHub contribution heatmap</h3>
          <p>Exact yearly activity from your GitHub profile.</p>
        </div>
        <a className="btn btn-secondary" href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
          Open GitHub
        </a>
      </div>

      {!hasData ? (
        <div className="contributions-fallback">
          <p>
            To show your exact GitHub activity board, add a GitHub Personal Access Token as the environment variable
            <code>GITHUB_TOKEN_NEW</code> and rebuild the site.
          </p>
          <p>
            The token only needs public repo access and is used on the build server to load contribution data from GitHub.
          </p>
        </div>
      ) : (
        calendars.map((entry) => {
          if (!entry.calendar) {
            return null;
          }

          const months = formatMonthLabels(entry.calendar.weeks);
          return (
            <div className="year-board" key={entry.year}>
              <div className="board-header">
                <div>
                  <h4>{entry.year}</h4>
                  <p>{entry.calendar.totalContributions} contributions</p>
                </div>
              </div>
              <div className="board-months">
                {months.map((month, index) => (
                  <span key={index} className="board-month">
                    {month}
                  </span>
                ))}
              </div>
              <div className="board-grid">
                {entry.calendar.weeks.map((week, weekIndex) => (
                  <div className="board-column" key={weekIndex}>
                    {week.contributionDays.map((day) => (
                      <div
                        key={day.date}
                        className="contribution-day"
                        style={{ backgroundColor: day.color }}
                        title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
