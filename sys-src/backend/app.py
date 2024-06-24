from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from database import save_user, find_user_by_email
from validation import validate_registration_data, validate_login_data
from flask_cors import CORS
from datetime import timedelta

app = Flask(__name__)
# Session handling 
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
app.secret_key                           = '4a88c8ffb1f57a2a7c0cb5f13d3e6e2b23a3490e59c2b0d2a1fa8a7d1b7c7f96' # Starken geheimen Schlüssel einfügen
app.config['SESSION_COOKIE_SECURE']      = True
app.config['SESSION_COOKIE_SAMESITE']    = 'Lax'
session(app)

CORS(app)

@app.route('/set_session', methods=['POST'])
def set_session():
    email = request.form.get('email')
    if email:
        session['email'] = email
        return f'Session-Daten für {email} gesetzt!'
    return 'Bitte eine E-Mail-Adresse angeben.', 400

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

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)
