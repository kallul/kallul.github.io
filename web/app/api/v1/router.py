from fastapi import APIRouter
from app.api.v1 import projects, skills, contact, gallery

api_router = APIRouter()

api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(skills.router, prefix="/skills", tags=["skills"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["gallery"])
