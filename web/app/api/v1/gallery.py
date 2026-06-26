from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
from pathlib import Path
from typing import List

from app.dependencies import get_db
from app.schemas.gallery import UIScreenshot
from app.services.gallery_service import GalleryService

router = APIRouter()

_UI_FOLDER = Path(__file__).parent.parent.parent.parent / "app" / "static" / "images" / "project_ui"
_IMG_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def _scan_folder() -> List[UIScreenshot]:
    """Return UIScreenshot items for every image in the project_ui folder."""
    items = []
    if not _UI_FOLDER.exists():
        return items
    for i, path in enumerate(sorted(_UI_FOLDER.iterdir())):
        if path.suffix.lower() in _IMG_EXTS:
            title = path.stem.replace("-", " ").replace("_", " ").title()
            items.append(UIScreenshot(
                id=f"file-{i}",
                title=title,
                image_url=f"/static/images/project_ui/{path.name}",
                order=i,
            ))
    return items


@router.get("/", response_model=List[UIScreenshot])
async def list_screenshots(db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        db_items = await GalleryService(db).get_all()
        # Merge folder-scanned images (those not already tracked in DB)
        db_urls = {item.image_url for item in db_items}
        folder_items = [f for f in _scan_folder() if f.image_url not in db_urls]
        return db_items + folder_items
    except Exception as e:
        return JSONResponse(status_code=503, content={"error": f"Database unavailable: {e}"})


@router.get("/{screenshot_id}", response_model=UIScreenshot)
async def get_screenshot(screenshot_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        item = await GalleryService(db).get_by_id(screenshot_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Screenshot not found")
        return item
    except HTTPException:
        raise
    except Exception as e:
        return JSONResponse(status_code=503, content={"error": f"Database unavailable: {e}"})
