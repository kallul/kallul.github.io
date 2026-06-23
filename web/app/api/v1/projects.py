from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List

from app.dependencies import get_db
from app.schemas.project import ProjectOut
from app.services.project_service import ProjectService

router = APIRouter()


@router.get("/", response_model=List[ProjectOut])
async def list_projects(db: AsyncIOMotorDatabase = Depends(get_db)):
    return await ProjectService(db).get_all()


@router.get("/{project_id}", response_model=ProjectOut)
async def get_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    project = await ProjectService(db).get_by_id(project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project
