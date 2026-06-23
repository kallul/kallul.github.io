from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import settings

_client: AsyncIOMotorClient | None = None


async def connect_db() -> None:
    global _client
    _client = AsyncIOMotorClient(settings.MONGO_URI)


async def close_db() -> None:
    if _client:
        _client.close()


async def get_database() -> AsyncIOMotorDatabase:
    return _client[settings.MONGO_DB_NAME]
