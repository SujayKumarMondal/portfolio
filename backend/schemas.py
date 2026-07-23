"""Pydantic response contracts for GitHub data."""

from datetime import date, datetime
from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class ContributionDay(BaseModel):
    """One day in the contribution calendar."""

    date: date
    count: int = Field(ge=0)
    level: int = Field(ge=0, le=4)


class ContributionWeek(BaseModel):
    """A Sunday-to-Saturday column in the calendar."""

    contribution_days: list[ContributionDay]


class ContributionCalendar(BaseModel):
    """Normalized contribution calendar returned to the browser."""

    total: int = Field(ge=0)
    weeks: list[ContributionWeek]


class FeaturedRepository(BaseModel):
    """Public fields displayed for a featured repository."""

    model_config = ConfigDict(from_attributes=True)

    name: str
    description: str
    primary_language: str | None
    updated_at: datetime
    html_url: HttpUrl