"""HTTP routes for the GitHub showcase."""

from fastapi import APIRouter, Depends, HTTPException, Response, status

from backend.config import Settings, get_settings
from backend.schemas import ContributionCalendar, FeaturedRepository
from backend.services.github_service import GitHubService, GitHubServiceError

router = APIRouter(prefix="/api/github", tags=["github"])


def get_github_service(settings: Settings = Depends(get_settings)) -> GitHubService:
    """Provide the GitHub service through FastAPI dependency injection."""

    return GitHubService(settings)


@router.get("/contributions", response_model=ContributionCalendar)
async def contributions(response: Response, service: GitHubService = Depends(get_github_service)) -> ContributionCalendar:
    """Return the authenticated user's contribution calendar."""

    response.headers["Cache-Control"] = "no-store, max-age=0"
    try:
        return await service.get_contributions()
    except GitHubServiceError as error:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(error)) from error


@router.get("/featured-repositories", response_model=list[FeaturedRepository])
async def featured_repositories(response: Response, service: GitHubService = Depends(get_github_service)) -> list[FeaturedRepository]:
    """Return normalized data for configured featured repositories."""

    response.headers["Cache-Control"] = "no-store, max-age=0"
    try:
        return await service.get_featured_repositories()
    except GitHubServiceError as error:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(error)) from error