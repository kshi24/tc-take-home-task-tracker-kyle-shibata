# imports
from flask import Flask, jsonify, request


app = Flask(__name__)

tasks = [

]

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify({"tasks": tasks})

# Create a new task (in-memory)
@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    title = (data.get("title") or "").strip()
    status = "pending"

    new_id = (max((t["id"] for t in tasks), default=0) + 1)
    task = {"id": new_id, "title": title, "status": status}
    tasks.append(task)
    return jsonify(task)

# Update task status (pending/completed)
@app.route("/api/tasks/<int:task_id>", methods=["PATCH"])
def update_task(task_id: int):
    data = request.get_json()
    status = data.get("status")

    for t in tasks:
        if t["id"] == task_id:
            t["status"] = status
            return jsonify(t)

    return jsonify({"error": "task not found"}), 404
if __name__ == "__main__":
    app.run(debug=True)