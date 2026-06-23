from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime

from app.schemas.contact import ContactForm
from app.core.email import send_email
from app.config import settings


class ContactService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["contact_submissions"]

    async def submit(self, form: ContactForm) -> None:
        await self.collection.insert_one({
            **form.model_dump(),
            "submitted_at": datetime.utcnow(),
        })
        await send_email(
            to=settings.CONTACT_EMAIL,
            subject=f"[Portfolio] {form.subject}",
            body=f"From: {form.name} <{form.email}>\n\n{form.message}",
        )
