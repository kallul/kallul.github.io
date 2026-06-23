from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from app.schemas.project import ProjectOut


class ProjectService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["projects"]

    async def get_all(self) -> List[ProjectOut]:
        docs = await self.collection.find().to_list(100)
        return [self._to_schema(doc) for doc in docs]

    async def get_by_id(self, project_id: str) -> Optional[ProjectOut]:
        doc = await self.collection.find_one({"_id": ObjectId(project_id)})
        return self._to_schema(doc) if doc else None

    def _to_schema(self, doc: dict) -> ProjectOut:
        doc["id"] = str(doc.pop("_id"))
        return ProjectOut(**doc)
