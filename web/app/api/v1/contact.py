from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.dependencies import get_db
from app.schemas.contact import ContactForm
from app.services.contact_service import ContactService

router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def submit_contact(form: ContactForm, db: AsyncIOMotorDatabase = Depends(get_db)):
    await ContactService(db).submit(form)
    return JSONResponse(content={"message": "Message received. Thank you!"})
