from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List

from app.dependencies import get_db
from app.schemas.skill import SkillOut

router = APIRouter()


@router.get("/", response_model=List[SkillOut])
async def list_skills(db: AsyncIOMotorDatabase = Depends(get_db)):
    skills = await db["skills"].find().to_list(100)
    return skills
