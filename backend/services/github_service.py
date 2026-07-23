"""GitHub API integration and upstream response normalization."""

from datetime import datetime, timedelta, timezone
import re
from typing import Any
from urllib.parse import urlparse

import httpx

from backend.config import FEATURED_REPOSITORIES, Settings
from backend.schemas import ContributionCalendar, ContributionDay, ContributionWeek, FeaturedRepository


class GitHubServiceError(RuntimeError):
    """Raised when GitHub cannot provide a valid response."""


class GitHubService:
    """Small, testable service around GitHub GraphQL and REST APIs."""

    def __init__(self, settings: Settings, timeout_seconds: float = 10.0) -> None:
        self.settings = settings
        self.timeout = httpx.Timeout(timeout_seconds)

    def _headers(self) -> dict[str, str]:
        """Build authenticated GitHub headers without exposing the token."""

        if not self.settings.github_token:
            raise GitHubServiceError("GITHUB_TOKEN is not configured")
        return {
            "Authorization": f"Bearer {self.settings.github_token}",
            "Accept": "application/vnd.github+json",
            "User-Agent": "sujay-portfolio-github-showcase",
        }

    async def _request(self, method: str, url: str, **kwargs: Any) -> httpx.Response:
        """Make a bounded GitHub request and normalize transport failures."""

        try:
            request_headers = self._headers()
            request_headers.update(kwargs.pop("headers", {}))
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                return await client.request(method, url, headers=request_headers, **kwargs)
        except httpx.TimeoutException as error:
            raise GitHubServiceError("GitHub request timed out") from error
        except httpx.HTTPError as error:
            raise GitHubServiceError("GitHub request could not be completed") from error

    async def get_contributions(self) -> ContributionCalendar:
        """Fetch the last year of contributions through GitHub GraphQL."""

        end = datetime.now(timezone.utc)
        start = end - timedelta(days=366)
        query = """
        query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays { date contributionCount contributionLevel }
                }
              }
            }
          }
        }
        """
        payload = {"query": query, "variables": {
            "login": self.settings.github_username,
            "from": start.isoformat(),
            "to": end.isoformat(),
        }}

        response = await self._request("POST", "https://api.github.com/graphql", json=payload)
        if response.is_error:
            raise GitHubServiceError(f"GitHub GraphQL returned HTTP {response.status_code}")
        body: dict[str, Any] = response.json()
        if body.get("errors") or not body.get("data", {}).get("user"):
            raise GitHubServiceError("GitHub returned no contribution calendar")

        calendar = body["data"]["user"]["contributionsCollection"]["contributionCalendar"]
        weeks = [ContributionWeek(contribution_days=[
            ContributionDay(date=day["date"], count=day["contributionCount"], level=self._level(day["contributionLevel"])
            ) for day in week["contributionDays"]
        ]) for week in calendar["weeks"]]
        return ContributionCalendar(total=calendar["totalContributions"], weeks=weeks)

    async def get_featured_repositories(self) -> list[FeaturedRepository]:
        """Fetch only the repositories declared in FEATURED_REPOSITORIES."""

        repositories = []
        for repository_url in FEATURED_REPOSITORIES:
            repository_api_url = self._repository_api_url(repository_url)
            response = await self._request("GET", repository_api_url)
            if response.is_error:
                raise GitHubServiceError(f"GitHub repository lookup failed with HTTP {response.status_code}")
            data: dict[str, Any] = response.json()
            readme_description = await self._get_readme_description(data["full_name"])
            repositories.append(FeaturedRepository(
                name=data["name"],
                description=readme_description or data.get("description") or "No description provided.",
                primary_language=(data.get("language") or None),
                updated_at=data["updated_at"],
                html_url=data["html_url"],
            ))
        return repositories

    @staticmethod
    def _repository_api_url(repository_url: str) -> str:
        """Convert a configured github.com repository URL to the GitHub REST endpoint."""

        parsed_url = urlparse(repository_url)
        repository_path = parsed_url.path.strip("/")
        if parsed_url.netloc.lower() != "github.com" or repository_path.count("/") != 1:
            raise GitHubServiceError(f"Invalid featured repository URL: {repository_url}")
        owner, repository = repository_path.split("/")
        return f"https://api.github.com/repos/{owner}/{repository.removesuffix('.git')}"

    async def _get_readme_description(self, full_name: str) -> str | None:
        """Fetch and reduce a repository README to one concise display sentence."""

        response = await self._request(
            "GET",
            f"https://api.github.com/repos/{full_name}/readme",
            headers={"Accept": "application/vnd.github.raw+json"},
        )
        if response.status_code == 404 or response.is_error:
            return None
        return self._summarize_readme(response.text)

    @staticmethod
    def _summarize_readme(readme: str) -> str | None:
        """Remove README decoration and cap the visible summary at 220 characters."""

        lines = []
        for raw_line in readme.splitlines():
            line = re.sub(r"!\[[^]]*\]\([^)]*\)", "", raw_line)
            line = re.sub(r"\[([^]]+)\]\([^)]*\)", r"\1", line)
            line = re.sub(r"[`*_>#~-]", "", line).strip()
            if line and not re.fullmatch(r"[|: .-]+", line):
                lines.append(line)
        summary = re.sub(r"\s+", " ", " ".join(lines)).strip()
        if not summary:
            return None
        return f"{summary[:217].rstrip()}..." if len(summary) > 220 else summary

    @staticmethod
    def _level(contribution_level: str) -> int:
        """Map GitHub's semantic intensity to the four frontend color levels."""

        return {"NONE": 0, "FIRST_QUARTILE": 1, "SECOND_QUARTILE": 2, "THIRD_QUARTILE": 3, "FOURTH_QUARTILE": 4}.get(contribution_level, 0)