"""
SQLAlchemy ORM Models
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, Date, Boolean, LargeBinary, ForeignKey, Text
from sqlalchemy.sql import func
from datetime import datetime

from app.database import Base

class User(Base):
    """Admin/Teacher User Model"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    full_name = Column(String(255))
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="teacher")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class Student(Base):
    """Student Model"""
    __tablename__ = "students"
    
    id = Column(Integer, primary_key=True, index=True)
    enrollment_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    email = Column(String(100), index=True)
    phone = Column(String(20))
    department = Column(String(100))
    class_section = Column(String(50))
    face_encoding = Column(LargeBinary)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class Attendance(Base):
    """Attendance Record Model"""
    __tablename__ = "attendance"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False, index=True)
    date = Column(Date, nullable=False, index=True)
    time_in = Column(DateTime)
    time_out = Column(DateTime)
    status = Column(String(20), default="Pending")
    confidence_score = Column(Float)
    notes = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())