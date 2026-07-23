
# Portfolio Website

Personal portfolio website for Sujay Kumar Mondal, built with HTML, CSS, Vanilla JavaScript, and a small FastAPI service for live GitHub data.

## 🌟 Features
- **Interactive Design**: A responsive, user-friendly interface optimized for all devices.
- **Live GitHub Showcase**: Contribution calendar and featured repository data fetched from GitHub.
- **Personal Projects**: The homepage and standalone Projects page use the same four configured GitHub repositories.
- **Dynamic Contact Section**: Easily reach out to me via email or social platforms.
- **Smooth Navigation**: Built with clean code and intuitive structure.

## 🛠️ Technologies Used
- **Frontend**: HTML, CSS, Vanilla JavaScript, ES6 modules
- **Backend**: FastAPI, Pydantic, HTTPX
- **External API**: GitHub GraphQL API and GitHub REST API
- **Styling**: Custom CSS, responsive mobile-first layout


## 📬 Contact Me
Feel free to connect with me for collaboration or queries:
- **Email**: [sujay.mondal.10.01.1998@gmail.com](sujay.mondal.10.01.1998@gmail.com)
- **GitHub**: [https://github.com/SujayKumarMondal](#)

## GitHub Showcase API

The live contribution calendar and featured repository cards use the FastAPI service in `backend/`. The browser calls:

- `GET /api/github/contributions`
- `GET /api/github/featured-repositories`

The API reads `GITHUB_TOKEN` and `GITHUB_USERNAME` from environment variables. The token is never sent to the browser.

### Featured Personal Projects

The repository list is configured in `backend/config.py` and currently contains:

- [Chatbot Project - FastAPI - Next JS](https://github.com/SujayKumarMondal/ChatBot-FastAPI-NextJS)
- [MFA - FastAPI Project](https://github.com/SujayKumarMondal/FastAPI-MFA)
- [OAuth2 - FastAPI Project](https://github.com/SujayKumarMondal/FastAPI-OAuth2)
- [Portfolio Project](https://github.com/SujayKumarMondal/portfolio)

For each repository, the API returns only the project name, a concise summary derived from the README, primary language, updated date, and repository URL. Full README content is never displayed.

### Local Development

1. Copy `.env.example` to `.env` and set `GITHUB_TOKEN` and `GITHUB_USERNAME`. Keep the token server-side and never commit `.env`.
2. Install the API dependencies with `python -m pip install -r requirements.txt`.
3. Start the backend from the project root:

	```powershell
	.\venv\Scripts\Activate.ps1
	python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8080
	```

4. In a second terminal, serve the static frontend from the project root:

	```powershell
	python -m http.server 5500
	```

5. Open [http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html). The API documentation is available at [http://127.0.0.1:8080/docs](http://127.0.0.1:8080/docs).

The frontend uses `cache: "no-store"`, and the API returns `Cache-Control: no-store`, so GitHub changes are picked up on reload. A refresh button is available in the showcase, and the page revalidates the data when the browser tab becomes active again after five minutes. Contribution period filters are applied locally without another API request.

---
