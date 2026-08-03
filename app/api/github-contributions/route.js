import { NextResponse } from 'next/server';

const query = `query ContributionCalendar($login:String!, $from:DateTime!, $to:DateTime!) {
  user(login:$login) {
    contributionsCollection(from:$from, to:$to) {
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

async function fetchContributionYear(username, from, to) {
  const token = process.env.GITHUB_TOKEN_NEW;
  if (!token) {
    throw new Error('GITHUB_TOKEN_NEW is not set in the runtime environment.');
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { login: username, from, to },
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${text}`);
  }

  const result = await response.json();
  return result?.data?.user?.contributionsCollection?.contributionCalendar || null;
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || 'SujayKumarMondal';
  const currentYear = new Date().getUTCFullYear();
  // Return current year and previous 4 years (descending)
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const calendars = await Promise.all(
    years.map(async (year) => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;
      try {
        const contributionCalendar = await fetchContributionYear(username, from, to);
        return { year, contributionCalendar };
      } catch (err) {
        return { year, error: String(err.message) };
      }
    })
  );

  return NextResponse.json({ calendars });
}
