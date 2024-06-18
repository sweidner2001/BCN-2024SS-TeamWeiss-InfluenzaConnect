from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import save_user, find_user_by_email
from validation import validate_registration_data, validate_login_data

app = Flask(__name__)

# Registrierungshandler
@app.route('/signup', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    title = data.get('title')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    birthdate = data.get('birthdate')
    country = data.get('country')
    state = data.get('state')
    phone = data.get('phone')
    language = data.get('language')
    about_me = data.get('about_me')
    instagram_username = data.get('instagram_username')

    # Eingabedaten validieren
    is_valid, message = validate_registration_data(email, password, title, first_name, last_name, country, state, phone, language, about_me, instagram_username)
    if not is_valid:
        return jsonify({"error": message}), 400

    user = find_user_by_email(email)

    if user:
        return jsonify({"error": "E-Mail-Adresse bereits registriert."}), 400

    # Passwort hashen
    hashed_password = generate_password_hash(password, method='sha256')

    # Benutzer in der Datenbank speichern
    new_user = {
        'email': email,
        'password': hashed_password,
        'title': title,
        'first_name': first_name,
        'last_name': last_name,
        'birthdate': birthdate,
        'country': country,
        'state': state,
        'phone': phone,
        'language': language,
        'about_me': about_me,
        'instagram_username': instagram_username
    }
    save_user(new_user)

    return jsonify({"message": "Registrierung erfolgreich."}), 201

# Anmeldehandler
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Eingabedaten validieren
    is_valid, message = validate_login_data(email, password)
    if not is_valid:
        return jsonify({"error": message}), 400

    user = find_user_by_email(email)

    if not user or not check_password_hash(user['password'], password):
        return jsonify({"error": "Ungültige E-Mail oder ungültiges Passwort."}), 401

    return jsonify({"message": "Anmeldung erfolgreich."}), 200
# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)