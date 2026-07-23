const API_BASE_URL = window.location.protocol === "file:"
    || ["5500", "5501"].includes(window.location.port)
    ? "http://127.0.0.1:8080/api/github"
    : "/api/github";

/** Escape upstream text before it is placed in a template string. */
function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[character]));
}

/** Format GitHub timestamps consistently for the visitor's locale. */
function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(new Date(value));
}

/** Render a 7-row, week-column calendar and preserve all data for frontend filtering. */
function renderCalendar(calendar, months) {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    const weeks = calendar.weeks.map(week => week.contribution_days);
    const labels = weeks.map(week => {
        const firstVisibleDay = week.find(day => new Date(`${day.date}T00:00:00`) >= cutoff);
        if (!firstVisibleDay) return "";
        const date = new Date(`${firstVisibleDay.date}T00:00:00`);
        return date.getDate() <= 7 ? date.toLocaleDateString(undefined, { month: "short" }) : "";
    });
    const cells = weeks.flatMap(week => Array.from({ length: 7 }, (_, index) => week[index] || null));
    const visibleCells = cells.map(day => day && new Date(`${day.date}T00:00:00`) >= cutoff ? day : null);
    const monthMarkup = labels.map(label => `<span>${escapeHtml(label)}</span>`).join("");
    const cellMarkup = visibleCells.map(day => {
        if (!day) return '<i class="contribution-cell empty" aria-hidden="true"></i>';
        const label = `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`;
        return `<i class="contribution-cell level-${day.level}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}" role="img"></i>`;
    }).join("");
    document.querySelector("#contribution-calendar").innerHTML = `<div class="calendar-frame"><div class="calendar-months">${monthMarkup}</div><div class="calendar-grid">${cellMarkup}</div></div>`;
    document.querySelector("#contribution-total").textContent = `${calendar.total.toLocaleString()} contributions in the last year`;
}

/** Render configured repositories without exposing fields the portfolio does not need. */
function repositoryMarkup(repository) {
    return `
        <article class="repository-card reveal-on-scroll">
            <h4 class="repository-card__name"><i class="far fa-folder-open"></i>${escapeHtml(repository.name)}</h4>
            <p class="repository-card__description">${escapeHtml(repository.description)}</p>
            <div class="repository-card__meta"><span class="language-badge">${escapeHtml(repository.primary_language || "Multiple languages")}</span><time datetime="${escapeHtml(repository.updated_at)}">Updated ${escapeHtml(formatDate(repository.updated_at))}</time></div>
            <a class="repository-card__link" href="${escapeHtml(repository.html_url)}" target="_blank" rel="noopener noreferrer">View repository <i class="fas fa-arrow-up-right-from-square"></i></a>
        </article>`;
}

/** Render the same live personal-project data in each requested project surface. */
function renderRepositories(repositories) {
    const markup = repositories.map(repositoryMarkup).join("");
    document.querySelector("#featured-repositories").innerHTML = markup;
    const projectsContainer = document.querySelector("#work .github-repository-grid");
    if (projectsContainer) projectsContainer.innerHTML = markup;
    observeReveals();
}

/** Put a friendly, non-breaking error into one failed API panel. */
function renderError(selector, message) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = `<p class="showcase-error">${escapeHtml(message)}</p>`;
}

/** Fetch one API resource with consistent HTTP error handling. */
async function fetchGithubResource(path) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        cache: "no-store",
        headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`GitHub showcase request failed (${response.status})`);
    return response.json();
}

/** Animate showcase panels and dynamically-created repository cards into view. */
function observeReveals() {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal-on-scroll:not(.is-visible)").forEach(element => {
        observer.observe(element);
    });
}

/** Boot the showcase, keeping contribution filters entirely in the browser. */
async function initializeGithubShowcase() {
    const range = document.querySelector("#contribution-range");
    const hasContributionCalendar = Boolean(range && document.querySelector("#contribution-calendar"));
    let calendar;
    if (hasContributionCalendar) {
        range.addEventListener("change", () => { if (calendar) renderCalendar(calendar, Number(range.value)); });
    }
    const refreshButton = document.querySelector("#github-refresh");
    const refreshShowcase = async () => {
        refreshButton?.classList.add("is-refreshing");
        const requests = [fetchGithubResource("/featured-repositories")];
        if (hasContributionCalendar) requests.unshift(fetchGithubResource("/contributions"));
        const results = await Promise.allSettled(requests);
        if (hasContributionCalendar) {
            const calendarResult = results[0];
            if (calendarResult.status === "fulfilled") { calendar = calendarResult.value; renderCalendar(calendar, Number(range.value)); }
            else renderError("#contribution-calendar", "Contribution history is temporarily unavailable.");
        }
        const repositoriesResult = results[results.length - 1];
        if (repositoriesResult.status === "fulfilled") renderRepositories(repositoriesResult.value);
        else renderError("#featured-repositories", "Featured repositories are temporarily unavailable.");
        refreshButton?.classList.remove("is-refreshing");
    };
    refreshButton?.addEventListener("click", refreshShowcase);
    await refreshShowcase();
    observeReveals();
    let lastRefresh = Date.now();
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible" && Date.now() - lastRefresh > 300000) {
            lastRefresh = Date.now();
            refreshShowcase();
        }
    });
}

document.addEventListener("DOMContentLoaded", initializeGithubShowcase);