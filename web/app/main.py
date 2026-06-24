from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.db.mongodb import connect_db, close_db, get_database
from app.api.v1.router import api_router

templates = Jinja2Templates(directory="app/templates")

_db_connected = False
_db_error = ""


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _db_connected, _db_error
    try:
        await connect_db()
        _db_connected = True
    except Exception as e:
        _db_error = str(e)
        _db_connected = False
        print(f"[WARN] MongoDB connection failed at startup: {e}")
    yield
    await close_db()


app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://kallul.com",
        "https://www.kallul.com",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse(request, "index.html")


@app.get("/health")
async def health():
    return {"status": "ok", "db_connected": _db_connected}


@app.get("/api/v1/status")
async def status():
    """Diagnose MongoDB connectivity — safe to expose (no credentials shown)."""
    host = settings.MONGO_URI.split("@")[-1].split("/")[0] if "@" in settings.MONGO_URI else "localhost"
    result = {
        "db_connected": _db_connected,
        "db_host": host,
        "db_name": settings.MONGO_DB_NAME,
        "error": _db_error or None,
    }
    if not _db_connected:
        # Try a live ping
        try:
            db = await get_database()
            await db.client.admin.command("ping")
            result["live_ping"] = "success"
        except Exception as e:
            result["live_ping"] = f"failed: {e}"
    return JSONResponse(result, status_code=200 if _db_connected else 503)
