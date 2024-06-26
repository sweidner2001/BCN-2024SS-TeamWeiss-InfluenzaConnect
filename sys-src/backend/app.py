from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from database import save_user, find_user_by_email
from validation import validate_registration_data, validate_login_data
from flask_cors import CORS
<<<<<<< HEAD
from userinfo_scripts import user_analysis as analysis
from userinfo_scripts import categorization
import database
=======
from datetime import timedelta
>>>>>>> main

app = Flask(__name__)
# Session handling 
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
app.secret_key = '4a88c8ffb1f57a2a7c0cb5f13d3e6e2b23a3490e59c2b0d2a1fa8a7d1b7c7f96'  # Use a strong secret key
app.config['SESSION_COOKIE_SECURE'] = False  # Should be True in production with HTTPS
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_HTTPONLY'] = True

CORS(app, supports_credentials=True)

@app.route('/set_session', methods=['POST'])
def set_session():
    data = request.json
    email = data.get('email')
    if email:
        session['email'] = email
        app.logger.debug(f'Session email set to: {session["email"]}')
        return jsonify(message=f'Session-Daten für {email} gesetzt!')
    return jsonify(message='Bitte eine E-Mail-Adresse angeben.'), 400

@app.route('/get_session_email', methods=['GET'])
def get_session_email():
    email = session.get('email')
    app.logger.debug(f'Retrieving session email: {email}')
    if email:
        return jsonify(email=email), 200
    return jsonify(message='No email in session'), 400

@app.route('/get_session')
def get_session():
    email = session.get('email', 'Nicht eingeloggt')
    return f'Eingeloggt als {email}'

@app.route('/remove_session')
def remove_session():
    session.pop('email', None)
    return 'Session-Daten entfernt!'

@app.route('/clear_session')
def clear_session():
    session.clear()
    return 'Alle Session-Daten gelöscht!'

# Registrierungshandler 
@app.route('/signup', methods=['POST'])
def signup():
    """
    Verarbeitet die Registrierung eines neuen Benutzers.
    
    Erwartet JSON-Daten im Anfrage-Body, die in drei Formen aufgeteilt sind (form1, form2, form3).
    Validiert die Eingabedaten und speichert den neuen Benutzer in der Datenbank, falls gültig.
    
    Returns:
        JSON-Antwort mit Erfolgs- oder Fehlermeldung.
    """
    data = request.json

    form1 = data.get('form1')
    form2 = data.get('form2')
    form3 = data.get('form3')


    email    = form1.get('email')
    password = form1.get('passwort')

    title      = form2.get('anrede')
    first_name = form2.get('vorname')
    last_name  = form2.get('nachname')
    # birthdate = data.get('geburtsdatum')
    country    = form2.get('land')
#     state      = form2.get('bundesland')
    phone      = form2.get('telefonnr')
    language   = form2.get('sprache')
    about_me   = form2.get('ueberMich')

    instagram_username = form3.get('instaUsername')

    # Eingabedaten validieren
    is_valid, errors = validate_registration_data(email, password, title, first_name, last_name, country, phone, language, about_me, instagram_username)
    if not is_valid:
        return jsonify(errors), 400

    user = find_user_by_email(app, email)

    if user:
        return jsonify({"email": "E-Mail-Adresse bereits registriert."}), 400

    # Passwort hashen
    hashed_password = generate_password_hash(password, method='scrypt')

    # Benutzer in der Datenbank speichern
    new_user = {
        'email': email,
        'password': hashed_password,
        'title': title,
        'first_name': first_name,
        'last_name': last_name,
        # 'birthdate': birthdate,
        'country': country,
        # 'state': state,
        'phone': phone,
        'language': language,
        'about_me': about_me,
        'instagram_username': instagram_username
    }
    save_user(app, new_user)

    return jsonify({"message": "Registrierung erfolgreich."}), 201

# Anmeldehandler
@app.route('/login', methods=['POST'])
def login():
    """
    Verarbeitet die Anmeldung eines Benutzers.
    
    Erwartet JSON-Daten im Anfrage-Body mit 'Email' und 'Password'.
    Überprüft die Eingabedaten und authentifiziert den Benutzer, falls gültig.
    
    Returns:
        JSON-Antwort mit Erfolgs- oder Fehlermeldung.
    """
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Eingabedaten validieren
    is_valid, error = validate_login_data(email, password)
    if not is_valid:
        return jsonify(error), 400

    user = find_user_by_email(app, email)

    if not user or not check_password_hash(user['password'], password):
        return jsonify({"passwort": "Ungültige E-Mail oder ungültiges Passwort."}), 401

    return jsonify({"message": "Anmeldung erfolgreich."}), 200

@app.route('/add_user_analysis', methods=['POST'])
def add_user_analysis():
    try:
        # extract JSON data
        data = request.json
        username = data['username']  # Extrahieren des Benutzernamens aus den JSON-Daten
        hashtags = categorization.get_instagram_hashtags(username)
        category = categorization.hashtagGPT(hashtags)
        analysis_data = {
            'instagram_username': username,
            'followers': analysis.get_instagram_followers(username),
            'average_comments': analysis.get_instagram_comments(username),
            'average_likes': analysis.get_instagram_likes(username),
            'time_since_last_post': analysis.time_since_last_post(username),
            'engagement_rate': analysis.engagement_rate(username),
            'primary_category': category[0],
            'secondary_category': category[1]
        }
        analysis_collection.insert_one(analysis_data)
        
    except Exception as e:
        return jsonify({'error': 'User analysis not found'}), 404

<<<<<<< HEAD

@app.route('/get_user_analysis/<username>', methods=['GET'])
def get_user_analysis(username):
    try:
        user = analysis_collection.find_one({'username': username})
        if user:
            # Sicherstellen, dass das zurückgegebene Dokument alle Felder des Standardschemas enthält
            analysis_data = {
            'instagram_username': username,
            'followers': user.get('followers', ''),
            'average_comments': user.get('average_comments', ''),
            'average_likes': user.get('average_likes', ''),
            'time_since_last_post': user.get('time_since_last_post', ''),
            'engagement_rate': user.get('engagement_rate', ''),
            'primary_category': user.get('primary_category', ''),
            'secondary_category': user.get('secondary_category', '')
            }
            return analysis_data
        else:
            return jsonify({'error': 'User analysis not found'}), 404
    except Exception as e:
        app.logger.error(f"Error finding user: {e}")
        return jsonify({'error': 'An error occurred while retrieving user analysis'}), 500
=======
# Datenbeschaffung für Profilansicht 
@app.route('/profileView', methods=['POST'])
def get_profile_data():
    data = request.json
    email = data.get('email')

    user = find_user_by_email(app, email)

    if not user:
        return jsonify({"error": "Ungültige E-Mail oder ungültiges Passwort."}), 401

    webscraping_data = []
    profile_picture = []

    user_data = {
        'user': user,
        'webscraping': webscraping_data,
        'profilPicture': profile_picture
    }

    return jsonify(user_data), 200
>>>>>>> main


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)