# imports
from flask import Flask, jsonify


app = Flask(__name__)

tasks = [
    {"id": 1, "title": "do coding hw", "status": "done"},
    {"id": 2, "title": "do tamid online assessement", "status": "in-progress"},
    {"id": 3, "title": "get swole", "status": "todo"},
]

@app.route("/tasks_request")
def tasks_request():
    return jsonify({"tasks": tasks})

@app.get("/")
def home():
    return "Flask is running"

if __name__ == "__main__":
    app.run(debug=True)