from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import settings

_client: AsyncIOMotorClient | None = None


async def connect_db() -> None:
    global _client
    _client = AsyncIOMotorClient(
        settings.MONGO_URI,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
    )
    # Verify the connection is reachable at startup
    await _client.admin.command("ping")


async def close_db() -> None:
    if _client:
        _client.close()


async def get_database() -> AsyncIOMotorDatabase:
    return _client[settings.MONGO_DB_NAME]
