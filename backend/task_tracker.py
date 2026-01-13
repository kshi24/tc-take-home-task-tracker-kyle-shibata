# imports
from flask import Flask, jsonify, request


app = Flask(__name__)

tasks = [
    {"id": 1, "title": "do coding hw", "status": "completed"},
    {"id": 2, "title": "do tamid online assessment", "status": "pending"},
    {"id": 3, "title": "get swole", "status": "pending"},
]

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify({"tasks": tasks})

# Create a new task (in-memory)
@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    status = (data.get("status") or "pending").strip() or "pending"

    if not title:
        return jsonify({"error": "title is required"}), 400

    new_id = (max((t["id"] for t in tasks), default=0) + 1)
    task = {"id": new_id, "title": title, "status": status}
    tasks.append(task)
    return jsonify(task), 201

# Update task status (pending/completed)
@app.route("/api/tasks/<int:task_id>", methods=["PATCH", "PUT"])
def update_task(task_id: int):
    data = request.get_json(silent=True) or {}
    status = (data.get("status") or "").strip().lower()

    if status not in {"pending", "completed"}:
        return jsonify({"error": "invalid status; must be 'pending' or 'completed'"}), 400

    for t in tasks:
        if t["id"] == task_id:
            t["status"] = status
            return jsonify(t)

    return jsonify({"error": "task not found"}), 404
if __name__ == "__main__":
    app.run(debug=True)