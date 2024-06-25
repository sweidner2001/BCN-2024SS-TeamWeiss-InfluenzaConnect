from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import save_user, find_user_by_email, fetch_all_users
from validation import validate_registration_data, validate_login_data
from flask_cors import CORS
from userinfo_scripts.user_analysis import (
    get_instagram_comments,
    get_instagram_likes,
    get_instagram_followers,
    engagement_rate,
    time_since_last_post,
    get_instagram_profile_pic
)
from userinfo_scripts.categorization import get_instagram_hashtags

app = Flask(__name__)
CORS(app)

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


@app.route('/collectData', methods=['POST'])
def collectData():
    """"
    Sammelt alle Daten für die Anzeige aller Instagramm Profile zusammen und gibt alle Daten zurück

    Returns:
        JSON-Antwort mit gesammelten Userdaten.
    """
    try:
        # Userdaten aus der Registrierungsdatenbank 
        all_users = fetch_all_users()
        user_data_dict = {}

        for user in all_users:
            user_data = {
                'email': user['email'],
                'password': user['password'],
                'title': user['title'],
                'first_name': user['first_name'],
                'last_name': user['last_name'],
                'country': user['country'],
                'phone': user['phone'],
                'language': user['language'],
                'about_me': user['about_me'],
                'instagram_username': user['instagram_username'],
                'instagram_comments_avg': get_instagram_comments(user['instagram_username']),
                'instagram_likes_avg': get_instagram_likes(user['instagram_username']),
                'instagram_followers': get_instagram_followers(user['instagram_username']),
                'instagram_engagement_rate': engagement_rate(user['instagram_username']),
                'instagram_time_since_last_post': time_since_last_post(user['instagram_username']),
                'hashtags': get_instagram_hashtags(user['instagram_username'])
            }

            # Optional: Download profile picture if needed
            get_instagram_profile_pic(user['instagram_username'])

            user_data_dict[user['_id']] = user_data

        return user_data_dict

    except Exception as e:
        print(f"Error collecting data: {e}")
        return {}


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)
