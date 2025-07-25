from app import create_app
from flask_cors import CORS

app = create_app()
CORS(app)  # Ajoute CORS sur l'app créée

if __name__ == '__main__':
    app.run(debug=True)
