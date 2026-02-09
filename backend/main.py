"""
EduariseAR Web Platform - Backend API
FastAPI server for AR content creation platform
"""

from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uvicorn
from datetime import datetime

# Initialize FastAPI
app = FastAPI(
    title="EduariseAR API",
    description="Web AR Platform for Educational Content Creation",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React/Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Serve viewer files
import os
viewer_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "viewer"))
print(f"Viewer path: {viewer_path}, exists: {os.path.exists(viewer_path)}")
if os.path.exists(viewer_path):
    app.mount("/viewer", StaticFiles(directory=viewer_path, html=True), name="viewer")
    print("Mounted viewer files at /viewer")

# ==================== Data Models ====================

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    grade_level: Optional[str] = None
    subject: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    grade_level: Optional[str]
    subject: Optional[str]
    owner_id: int
    is_published: bool
    share_link: Optional[str]
    created_at: datetime
    marker_count: int = 0
    view_count: int = 0

class MarkerCreate(BaseModel):
    title: str
    description: Optional[str] = None
    marker_id: int
    position: Optional[dict] = {"x": 0, "y": 0, "z": 0}
    rotation: Optional[dict] = {"x": 0, "y": 0, "z": 0}
    scale: Optional[dict] = {"x": 1, "y": 1, "z": 1}

class QuizCreate(BaseModel):
    question: str
    options: List[str]
    correct_answer: int
    explanation: Optional[str] = None

# ==================== In-Memory Storage (temporary) ====================
# TODO: Replace with database

users_db = []
projects_db = []
markers_db = []

# ==================== Authentication ====================

@app.post("/api/auth/register")
async def register(user: UserCreate):
    """Register a new user"""
    # Check if user exists
    if any(u["email"] == user.email for u in users_db):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password (TODO: use proper hashing)
    user_data = {
        "id": len(users_db) + 1,
        "email": user.email,
        "full_name": user.full_name,
        "hashed_password": user.password,  # TODO: hash this
        "created_at": datetime.now(),
        "is_active": True
    }
    users_db.append(user_data)
    
    return {
        "message": "User registered successfully",
        "user_id": user_data["id"],
        "email": user_data["email"]
    }

@app.post("/api/auth/login")
async def login(credentials: UserLogin):
    """Login user"""
    user = next((u for u in users_db if u["email"] == credentials.email), None)
    
    if not user or user["hashed_password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # TODO: Generate JWT token
    return {
        "access_token": f"token_{user['id']}",
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "full_name": user["full_name"]
        }
    }

# ==================== Projects ====================

@app.get("/api/projects")
async def list_projects(user_id: int = 1):
    """List all projects for a user"""
    user_projects = [p for p in projects_db if p["owner_id"] == user_id]
    
    # Add marker and view counts
    for project in user_projects:
        project["marker_count"] = len([m for m in markers_db if m["project_id"] == project["id"]])
        project["view_count"] = 0  # TODO: get from analytics
    
    return user_projects

@app.post("/api/projects")
async def create_project(project: ProjectCreate, user_id: int = 1):
    """Create a new AR project"""
    project_data = {
        "id": len(projects_db) + 1,
        "title": project.title,
        "description": project.description,
        "grade_level": project.grade_level,
        "subject": project.subject,
        "owner_id": user_id,
        "is_published": False,
        "share_link": None,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    projects_db.append(project_data)
    
    return project_data

@app.get("/api/projects/{project_id}")
async def get_project(project_id: int):
    """Get a specific project"""
    project = next((p for p in projects_db if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Add markers
    project_markers = [m for m in markers_db if m["project_id"] == project_id]
    project["markers"] = project_markers
    
    return project

@app.put("/api/projects/{project_id}")
async def update_project(project_id: int, project: ProjectCreate):
    """Update a project"""
    existing = next((p for p in projects_db if p["id"] == project_id), None)
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    
    existing.update({
        "title": project.title,
        "description": project.description,
        "grade_level": project.grade_level,
        "subject": project.subject,
        "updated_at": datetime.now()
    })
    
    return existing

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: int):
    """Delete a project"""
    global projects_db, markers_db
    projects_db = [p for p in projects_db if p["id"] != project_id]
    markers_db = [m for m in markers_db if m["project_id"] != project_id]
    
    return {"message": "Project deleted"}

@app.post("/api/projects/{project_id}/publish")
async def publish_project(project_id: int):
    """Publish a project and generate share link"""
    project = next((p for p in projects_db if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Generate share link
    import secrets
    share_code = secrets.token_urlsafe(8)
    share_link = f"https://ar.eduarise.com/{share_code}"
    
    project["is_published"] = True
    project["share_link"] = share_link
    
    return {
        "message": "Project published",
        "share_link": share_link
    }

# ==================== Markers ====================

@app.post("/api/projects/{project_id}/markers")
async def create_marker(project_id: int, marker: MarkerCreate):
    """Add a marker to a project"""
    marker_data = {
        "id": len(markers_db) + 1,
        "project_id": project_id,
        "marker_id": marker.marker_id,
        "title": marker.title,
        "description": marker.description,
        "image_url": None,
        "model_url": None,
        "audio_url": None,
        "position": marker.position,
        "rotation": marker.rotation,
        "scale": marker.scale,
        "created_at": datetime.now()
    }
    markers_db.append(marker_data)
    
    return marker_data

@app.get("/api/projects/{project_id}/markers")
async def list_markers(project_id: int):
    """List all markers in a project"""
    return [m for m in markers_db if m["project_id"] == project_id]

# ==================== File Upload ====================

@app.post("/api/upload/image")
async def upload_image(file: UploadFile = File(...)):
    """Upload an image file"""
    import os
    from pathlib import Path
    
    # Create uploads directory if it doesn't exist
    Path("uploads/images").mkdir(parents=True, exist_ok=True)
    
    # Save file
    file_path = f"uploads/images/{file.filename}"
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    return {
        "filename": file.filename,
        "url": f"/uploads/images/{file.filename}",
        "size": len(content)
    }

@app.post("/api/upload/model")
async def upload_model(file: UploadFile = File(...)):
    """Upload a 3D model file"""
    import os
    from pathlib import Path
    
    # Create uploads directory
    Path("uploads/models").mkdir(parents=True, exist_ok=True)
    
    # Validate file type
    allowed_extensions = [".gltf", ".glb", ".obj", ".fbx"]
    if not any(file.filename.endswith(ext) for ext in allowed_extensions):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    # Save file
    file_path = f"uploads/models/{file.filename}"
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    return {
        "filename": file.filename,
        "url": f"/uploads/models/{file.filename}",
        "size": len(content)
    }

# ==================== AR Scene Data ====================

@app.get("/api/ar/{share_code}")
async def get_ar_scene(share_code: str):
    """Get AR scene data for student viewer"""
    # Find project by share link
    share_link = f"https://ar.eduarise.com/{share_code}"
    project = next((p for p in projects_db if p.get("share_link") == share_link), None)
    
    if not project or not project["is_published"]:
        raise HTTPException(status_code=404, detail="AR scene not found")
    
    # Get markers
    project_markers = [m for m in markers_db if m["project_id"] == project["id"]]
    
    return {
        "project": {
            "title": project["title"],
            "description": project["description"]
        },
        "markers": project_markers
    }

# ==================== Marker Generation ====================

@app.post("/api/markers/generate")
async def generate_markers(count: int = 10):
    """Generate ArUco markers - updated"""
    import cv2
    import numpy as np
    from pathlib import Path
    
    # Create markers directory
    Path("uploads/markers").mkdir(parents=True, exist_ok=True)
    
    # Generate markers (updated for OpenCV 4.7+)
    aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_250)
    generated = []
    
    for i in range(count):
        # Create marker image
        marker_image = cv2.aruco.generateImageMarker(aruco_dict, i, 200)
        
        # Save marker
        filename = f"marker_{i}.png"
        filepath = f"uploads/markers/{filename}"
        cv2.imwrite(filepath, marker_image)
        
        generated.append({
            "marker_id": i,
            "filename": filename,
            "url": f"/uploads/markers/{filename}"
        })
    
    return {
        "success": True,
        "count": len(generated),
        "markers": [m["url"] for m in generated],
        "details": generated
    }

# ==================== Health Check ====================

@app.get("/")
async def root():
    """Health check"""
    return {
        "message": "EduariseAR API is running",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "projects": len(projects_db),
        "markers": len(markers_db),
        "users": len(users_db)
    }

# ==================== Run Server ====================

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
