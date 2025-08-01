from app import create_app
from flask_cors import CORS
from flask import Flask, make_response

app = create_app()

# Configuration CORS propre
CORS(
    app,
    origins=["http://localhost:5500"],
    supports_credentials=True,
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)

if __name__ == '__main__':
    app.run(debug=True)
