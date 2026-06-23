from pydantic import BaseModel
from typing import List, Optional


class ProjectOut(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    tech_stack: List[str] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    company: Optional[str] = None
    year_start: Optional[str] = None
    year_end: Optional[str] = None
    category: Optional[str] = None

    class Config:
        from_attributes = True
        extra = "ignore"
