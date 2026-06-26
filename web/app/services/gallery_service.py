from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from app.schemas.gallery import UIScreenshot


class GalleryService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["ui_screenshots"]

    async def get_all(self) -> List[UIScreenshot]:
        docs = await self.collection.find().sort("order", 1).to_list(200)
        return [self._to_schema(doc) for doc in docs]

    async def get_by_id(self, screenshot_id: str) -> Optional[UIScreenshot]:
        doc = await self.collection.find_one({"_id": ObjectId(screenshot_id)})
        return self._to_schema(doc) if doc else None

    def _to_schema(self, doc: dict) -> UIScreenshot:
        doc["id"] = str(doc.pop("_id"))
        return UIScreenshot(**doc)
