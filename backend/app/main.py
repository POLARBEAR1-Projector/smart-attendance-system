"""
Main FastAPI Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from contextlib import asynccontextmanager

from app.config import settings
from app.database import engine, Base

logging.basicConfig(level=settings.LOG_LEVEL)
logger = logging.getLogger(__name__)

# Startup event
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Smart Attendance System...")
    Base.metadata.create_all(bind=engine)
    logger.info("Database initialized")
    yield
    logger.info("Shutting down Smart Attendance System")

# Create FastAPI instance - THIS IS IMPORTANT
app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_CREDENTIALS,
    allow_methods=settings.CORS_METHODS,
    allow_headers=settings.CORS_HEADERS,
)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Smart Attendance System API",
        "version": settings.API_VERSION,
        "docs": "/docs"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "environment": settings.ENVIRONMENT}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)