"""
Pydantic Request/Response Schemas
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

class StudentResponse(BaseModel):
    id: int
    enrollment_id: str
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    class_section: Optional[str] = None
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class AttendanceResponse(BaseModel):
    id: int
    student_id: int
    date: date
    status: str
    confidence_score: Optional[float] = None
    created_at: datetime
    
    class Config:
        from_attributes = True