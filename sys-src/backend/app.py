from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from pymongo import MongoClient, errors
from instaloader import instaloader
from IPython.display import display, Image  # Diese Zeile wird nicht benötigt


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# MongoDB client setup
client = MongoClient('mongodb', 27017)  # Connect to MongoDB service
db = client['InfluenzaDB']  # Select database

test_collection = db['test']  # Collection for testing

# Define routes
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/test', methods=['GET'])
def your_endpoint():
    return jsonify({"message": "Hello from backend!"})


@app.route('/testdb', methods=['GET'])
def test_db():
    try:
        result = test_collection.insert_one({"message": "Hello from MongoDB!"})
        return jsonify({"message": "Data inserted successfully!", "id": str(result.inserted_id)})
    except errors.PyMongoError as e:
        app.logger.error(f"Error inserting data into MongoDB: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# die funktionalität deiner Anfrage und verarbeitung der daten in ein eigenes .py skript auslagern und dann hier importieren
# dieses skript soll irgendwo in /backend/src liegen
@app.route('/process', methods=['POST'])
def process():
    # Erhalte die JSON-Daten aus der Anfrage
    data = request.json
    # Hole den Parameter 'param' aus den JSON-Daten
    param = "alexa_breit"#data.get('param')
    
    # Überprüfen, ob der Parameter existiert
    if not param:
        return jsonify({'error': 'Parameter "param" is required'}), 400

    # Erstelle eine Instanz von Instaloader
    L = instaloader.Instaloader()

    try:
        # Lade das Instagram-Profil mit dem angegebenen Benutzernamen
        profile = instaloader.Profile.from_username(L.context, param)

        # Erhalte die URL des Profilbildes
        profile_pic_url = profile.profile_pic_url
        print(f"Profilbild URL: {profile_pic_url}")

        # Erhalte die Profilbeschreibung (Bio)
        profile_bio = profile.biography
        print(f"Profilbeschreibung: {profile_bio}")

        # Erhalte die letzten drei Posts
        posts = []
        for post in profile.get_posts():
            if len(posts) < 3:
                posts.append(post)
            else:
                break

        

        # Rückgabe der Profilbild-URL und der Profilbeschreibung als JSON-Antwort
        return jsonify({'Profile_Picture': profile_pic_url, 'Profile_Bio': profile_bio})
    
    except instaloader.exceptions.ProfileNotExistsException:
        return jsonify({'error': 'Profile not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)