from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List

from app.dependencies import get_db
from app.schemas.project import ProjectOut
from app.services.project_service import ProjectService

router = APIRouter()


@router.get("/", response_model=List[ProjectOut])
async def list_projects(db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        return await ProjectService(db).get_all()
    except Exception as e:
        return JSONResponse(status_code=503, content={"error": f"Database unavailable: {e}"})


@router.get("/{project_id}", response_model=ProjectOut)
async def get_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        project = await ProjectService(db).get_by_id(project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        return project
    except HTTPException:
        raise
    except Exception as e:
        return JSONResponse(status_code=503, content={"error": f"Database unavailable: {e}"})
