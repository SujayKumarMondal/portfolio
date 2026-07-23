"""FastAPI application entry point for the portfolio API."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import get_settings
from backend.routers.github import router as github_router

app = FastAPI(title="Sujay Portfolio API", version="1.0.0")
settings = get_settings()
app.add_middleware(
	CORSMiddleware,
	allow_origins=[
		"http://localhost:5500",
		"http://127.0.0.1:5500",
		"http://localhost:5501",
		"http://127.0.0.1:5501",
		"http://localhost:8080",
		"http://127.0.0.1:8080",
	],
	allow_methods=["GET"],
	allow_headers=["Accept", "Content-Type"],
)
app.include_router(github_router)