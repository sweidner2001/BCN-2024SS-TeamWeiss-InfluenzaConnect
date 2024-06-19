# Importiere notwendige Bibliotheken und Module
from flask import Flask, request, jsonify
from flask_cors import CORS
import instaloader
from IPython.display import display, Image  # Diese Zeile wird nicht benötigt

# Erstelle eine Flask-App und aktiviere Cross-Origin-Resource-Sharing (CORS)
app = Flask(__name__)
CORS(app)  # Erlaubt Cross-Origin-Requests

# Definiere eine Route für den Endpunkt /, der POST/GET-Anfragen akzeptiert
@app.route('/process', methods=['POST', 'GET'])
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
        print(str(jsonify({'Profile_Picture': profile_pic_url})))#f"Profilbild URL: {profile_pic_url}"

        # Erhalte die Profilbeschreibung (Bio)
        profile_bio = profile.biography
        print(f"Profilbeschreibung: {profile_bio}")

        # Erhalte die letzten drei Posts
        posts = []
        for post in profile.get_posts():
            if len(posts) < 10:
                posts.append(post)
            else:
                break

        

        # Rückgabe der Profilbild-URL und der Profilbeschreibung als JSON-Antwort
        return jsonify({'Profile_Picture': profile_pic_url, 'Profile_Bio': profile_bio})
    
    except instaloader.exceptions.ProfileNotExistsException:
        return jsonify({'error': 'Profile not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# Starte die Flask-Anwendung im Debug-Modus 

if __name__ == '__main__':
    app.run(debug=True)
