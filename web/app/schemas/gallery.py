from pydantic import BaseModel
from typing import Optional


class UIScreenshot(BaseModel):
    id: Optional[str] = None
    title: str
    project_name: Optional[str] = None
    image_url: str
    order: Optional[int] = 0

    class Config:
        from_attributes = True
        extra = "ignore"
