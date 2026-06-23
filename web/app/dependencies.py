from app.db.mongodb import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi import Depends


async def get_db() -> AsyncIOMotorDatabase:
    return await get_database()
