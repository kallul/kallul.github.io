from pydantic import BaseModel
from typing import Optional


class SkillOut(BaseModel):
    id: Optional[str] = None
    name: str
    category: str
    proficiency: int  # 1–5

    class Config:
        from_attributes = True
