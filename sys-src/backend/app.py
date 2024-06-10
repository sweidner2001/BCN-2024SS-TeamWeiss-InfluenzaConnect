from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db_connection, save_user, find_user_by_email
from validation import validate_registration_data

app = Flask(__name__)

# Registrierungshandler
@app.route('/signup', methods=['POST'])
def register():
    data        = request.json
    name        = data.get('name')
    birthdate   = data.get('birthdate')
    country     = data.get('country')
    languages   = data.get('languages')
    email       = data.get('email')
    password    = data.get('password')
    phone       = data.get('phone')

    # Eingabedaten validieren
    is_valid, message = validate_registration_data(name, birthdate, country, languages, email, password, phone)
    if not is_valid:
        return jsonify({"error": message}), 400

    user = find_user_by_email(email)

    if user:
        return jsonify({"error": "E-Mail-Adresse bereits registriert."}), 400

    # Passwort hashen
    hashed_password = generate_password_hash(password, method='sha256')

    # Benutzer in der Datenbank speichern
    new_user = {
        'name': name,
        'birthdate': birthdate,
        'country': country,
        'languages': languages,
        'email': email,
        'password': hashed_password,
        'phone': phone
    }
    save_user(new_user)

    return jsonify({"message": "Registrierung erfolgreich."}), 201

@app.route('/login', methods=['POST'])
def login():
    data       = request.json
    email      = data.get('email')
    password   = data.get('password')

    # Eingabedaten validieren
    if not email or not password:
        return jsonify({"error": "E-Mail und Passwort sind erforderlich."}), 400

    user = find_user_by_email(email)

    if not user or not check_password_hash(user['password'], password):
        return jsonify({"error": "Ungültige E-Mail oder ungültiges Passwort."}), 401

    return jsonify({"message": "Anmeldung erfolgreich."}), 200

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)