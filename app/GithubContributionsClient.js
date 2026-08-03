'use client';

import { useEffect, useState } from 'react';

function monthLabelForWeek(week, year) {
  const dayInYear = week.contributionDays.find((day) => new Date(day.date).getUTCFullYear() === year);
  if (!dayInYear) return '';
  return new Date(dayInYear.date).toLocaleString('default', { month: 'short' });
}

function formatMonthLabels(weeks, year) {
  const labels = [];
  let lastMonth = '';

  weeks.forEach((week) => {
    const monthName = monthLabelForWeek(week, year);
    if (monthName && monthName !== lastMonth) {
      labels.push(monthName);
      lastMonth = monthName;
    } else {
      labels.push('');
    }
  });

  return labels;
}

export default function GitHubContributionsClient() {
  const [contributions, setContributions] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadContributions() {
      try {
        const resp = await fetch('/api/github-contributions');
        if (!resp.ok) {
          throw new Error('Unable to fetch GitHub data');
        }
        const data = await resp.json();
        let entries = data.calendars || [];
        // ensure descending year order and limit to 5 years
        entries = entries
          .slice()
          .sort((a, b) => Number(b.year) - Number(a.year))
          .slice(0, 5);
        setContributions(entries);
        setSelectedYear(entries[0] ? String(entries[0].year) : '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadContributions();
  }, []);

  if (loading) {
    return <div className="contributions-fallback">Loading contribution boards…</div>;
  }

  if (error || !contributions || contributions.length === 0) {
    return (
      <div className="contributions-fallback">
        <p>
          To show your exact GitHub activity board, add a GitHub Personal Access Token as the environment variable
          <code>GITHUB_TOKEN</code> and rebuild the site.
        </p>
        <p>The token requires only public repo access and is used on the build server to load contribution data from GitHub.</p>
      </div>
    );
  }

  const selectedEntry = contributions.find((entry) => String(entry.year) === String(selectedYear)) || contributions[0];
  const calendar = selectedEntry?.contributionCalendar;
  const selectedYearNumber = Number(selectedEntry.year);

  if (!calendar) {
    return (
      <div className="contributions-fallback">
        <p>Contribution data is unavailable for the selected year.</p>
      </div>
    );
  }

  const months = formatMonthLabels(calendar.weeks, selectedYearNumber);
  const totalContributions = calendar.weeks.reduce((total, week) => {
    return (
      total +
      week.contributionDays.reduce((weekTotal, day) => {
        const dayYear = new Date(day.date).getUTCFullYear();
        return weekTotal + (dayYear === selectedYearNumber ? day.contributionCount : 0);
      }, 0)
    );
  }, 0);

  return (
    <div className="year-board">
      <div className="board-header">
        <div>
          <h4>{selectedEntry.year}</h4>
          <p>{totalContributions} contributions</p>
        </div>
        <div className="board-controls">
          <label htmlFor="year-select" className="year-select-label">
            Year
          </label>
          <div className="year-select-wrapper">
            <select
              id="year-select"
              className="year-select"
              value={String(selectedEntry.year)}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              {contributions.map((entry) => (
                <option key={entry.year} value={String(entry.year)}>
                  {entry.year}
                </option>
              ))}
            </select>
            <span className="year-select-arrow">▾</span>
          </div>
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
        {calendar.weeks.map((week, weekIndex) => (
          <div className="board-column" key={weekIndex}>
            {week.contributionDays.map((day) => {
              const dayYear = new Date(day.date).getUTCFullYear();
              const isCurrentYear = dayYear === selectedYearNumber;
              return (
                <div
                  key={day.date}
                  className={`contribution-day ${isCurrentYear ? '' : 'contribution-day--inactive'}`}
                  style={{ backgroundColor: isCurrentYear ? day.color : 'transparent' }}
                  title={isCurrentYear ? `${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}` : undefined}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
