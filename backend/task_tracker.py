# imports
from flask import Flask, jsonify


app = Flask(__name__)

tasks = [
    {"id": 1, "title": "do coding hw", "status": "completed"},
    {"id": 2, "title": "do tamid online assessement", "status": "pending"},
    {"id": 3, "title": "get swole", "status": "pending"},
]

@app.route("/tasks_request")
def tasks_request():
    return jsonify({"tasks": tasks})
if __name__ == "__main__":
    app.run(debug=True)