# tc-take-home-task-tracker-kyle-shibata
This project is the take home assessment task tracker application for the tech consulting track of TAMID.

# Stack:
    Frontend: React
    Backend: Python Flask

# Setup:
    Python 3.x
    Node.js + npm
    Backend dependencies
    pip install -r requirements.txt
    Frontend dependencies
    cd frontend && npm install

# How to run
    cd backend
    python3 task_tracker.py

    cd frontend
    npm start

    Open http://localhost:3000

# Requirements met:
 Frontend: 
    Initializes React app
    Fetches /api/tasks on component mount
    Renders tasks in a readable list
    Shows "Loading..." state during fetch
    Styles "completed" vs "pending" tasks
    Responsive design(Mobile/Desktop)

Backend:
    Initializes Flask server in /backend
    Creates GET /api/tasks endpoint
    Returns JSON list of tasks
    Task Object: id, title, status
    Uses in-memory data (List of Dicts)

# API Endpoints
GET /api/tasks
    Description: Return all tasks
    Response: { "tasks": [ { "id": number, "title": string, "status": "pending" | "completed" }, ... ] }
POST /api/tasks
    Description: Create a new task
    Body (JSON): { "title": string, "status"?: "pending" | "completed" }
    Response: Created task object
    Errors: 400 if title missing/empty
PATCH/PUT /api/tasks/:id
    Description: Update status of a task
    Body (JSON): { "status": "pending" | "completed" }
    Response: Updated task object
    Errors: 400 invalid status, 404 not found