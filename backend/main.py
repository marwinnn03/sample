import json
import os
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Marwin Batis Portfolio API", version="1.0.0")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database file paths
MESSAGES_FILE = os.path.join(os.path.dirname(__file__), "messages.json")

# Data Models
class Project(BaseModel):
    id: int
    title: str
    desc: str
    category: str
    tags: List[str]
    emoji: str
    demoUrl: str
    codeUrl: str

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

# Sample Projects Database (python state)
PROJECTS_DATABASE = [
    {
        "id": 1,
        "title": "Aura Market E-Shop",
        "desc": "Isang ganap na e-commerce platform na may cart system, payment gateway module, at custom user dashboard integration.",
        "category": "Full-Stack",
        "tags": ["React", "Node.js", "Express", "MongoDB"],
        "emoji": "🛒",
        "demoUrl": "#",
        "codeUrl": "#"
    },
    {
        "id": 2,
        "title": "Interactive Project Board",
        "desc": "Kanban management application na may drag-and-drop mechanics, nested task tags, at live state sync sa local storage.",
        "category": "Frontend",
        "tags": ["React", "TypeScript", "CSS Grid", "Vite"],
        "emoji": "📋",
        "demoUrl": "#",
        "codeUrl": "#"
    },
    {
        "id": 3,
        "title": "Developer Auth API Gateway",
        "desc": "Ligtas na authentication API gateway na gumagamit ng JWT tokens, refresh algorithms, at rate limiter rules.",
        "category": "APIs",
        "tags": ["Node.js", "Express", "JWT", "Redis"],
        "emoji": "🔑",
        "demoUrl": "#",
        "codeUrl": "#"
    },
    {
        "id": 4,
        "title": "Sleek UI CSS Framework",
        "desc": "Custom glassmorphic React components toolkit para sa mabilisang pagbuo ng high-performance interfaces.",
        "category": "Frontend",
        "tags": ["React", "Vanilla CSS", "Responsive design"],
        "emoji": "🎨",
        "demoUrl": "#",
        "codeUrl": "#"
    }
]

@app.get("/")
def read_root():
    return {"status": "online", "message": "Welcome to Marwin Batis' Portfolio API Server"}

@app.get("/api/projects", response_model=List[Project])
def get_projects():
    """Ibalik ang listahan ng mga proyekto ng portfolio."""
    return PROJECTS_DATABASE

@app.post("/api/contact")
def receive_contact_message(msg: ContactMessage):
    """Makatanggap ng mensahe mula sa contact form at i-save sa local file."""
    try:
        # Load existing messages
        messages = []
        if os.path.exists(MESSAGES_FILE):
            with open(MESSAGES_FILE, "r", encoding="utf-8") as f:
                try:
                    messages = json.load(f)
                except json.JSONDecodeError:
                    messages = []
        
        # Append new message
        new_message = {
            "name": msg.name,
            "email": msg.email,
            "message": msg.message,
            "timestamp": os.getenv("CURRENT_TIME", "2026-07-20T01:18:00+08:00")
        }
        messages.append(new_message)
        
        # Save back to file
        with open(MESSAGES_FILE, "w", encoding="utf-8") as f:
            json.dump(messages, f, indent=4, ensure_ascii=False)
            
        print(f"\n[NEW MESSAGE] Mula kay {msg.name} ({msg.email}): {msg.message}\n")
        return {"success": True, "message": "Message saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process message: {str(e)}")
