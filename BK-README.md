# Portfolio — Web Frontend

A personal software engineering portfolio built with **FastAPI**, **MongoDB**, **Bootstrap 5**, and **SQLAlchemy**. The application serves a dynamic portfolio website showcasing projects, skills, and professional experience.

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Backend    | Python 3.11+ / FastAPI  |
| Database   | MongoDB                 |
| ORM        | SQLAlchemy              |
| Frontend   | Bootstrap 5 (Jinja2 templates) |

---

## Features

- Dynamic project showcase with filterable categories
- Skills and experience sections
- Contact form with backend email handling
- REST API endpoints for portfolio data
- Responsive design via Bootstrap 5

---

## Prerequisites

Make sure the following are installed on your machine:

- [Python 3.11+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a MongoDB Atlas connection string)
- [Git](https://git-scm.com/)

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd portfolio_max/apps/web
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the `apps/web` directory:

```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=portfolio
SECRET_KEY=your-secret-key-here
```

### 5. Start MongoDB

If running MongoDB locally:

```bash
mongod
```

Or connect to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) by setting `MONGO_URI` to your Atlas connection string in `.env`.

---

## Running the App

```bash
uvicorn main:app --reload
```

The app will be available at `http://localhost:8000`.

API documentation is auto-generated at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## Project Structure

```
apps/web/
├── main.py              # FastAPI app entry point
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (not committed)
├── routers/             # API route handlers
├── models/              # Database models (SQLAlchemy / MongoDB)
├── templates/           # Jinja2 HTML templates
└── static/              # CSS, JS, and image assets
```

---

## Development Notes

- Bootstrap 5 is used for all UI components via Jinja2 templates rendered server-side by FastAPI.
- MongoDB stores portfolio content (projects, skills, contact submissions).
- SQLAlchemy manages any relational data alongside MongoDB.

---

## License

MIT
