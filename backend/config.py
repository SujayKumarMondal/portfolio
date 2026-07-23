"""Application configuration for the GitHub showcase API."""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings loaded from environment variables or a local .env file."""

    github_token: str = ""
    github_username: str = "SujayKumarMondal"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


FEATURED_REPOSITORIES: tuple[str, ...] = (
    "https://github.com/SujayKumarMondal/ChatBot-FastAPI-NextJS",
    "https://github.com/SujayKumarMondal/FastAPI-MFA",
    "https://github.com/SujayKumarMondal/FastAPI-OAuth2",
    "https://github.com/SujayKumarMondal/portfolio",
)


@lru_cache
def get_settings() -> Settings:
    """Return one cached settings instance for the application process."""

    return Settings()