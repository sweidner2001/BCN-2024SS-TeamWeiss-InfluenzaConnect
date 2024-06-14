import re
from datetime import datetime

def validate_registration_data(email, password, title, first_name, last_name, country, state, phone, language, about_me, instagram_username):
    if not email or not password or not title or not first_name or not last_name or not country or not state or not language or not instagram_username:
        return False, "Alle Felder außer Telefonnummer und Über mich sind erforderlich."
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False, "Ungültige E-Mail-Adresse."
    if len(password) < 8:
        return False, "Passwort muss mindestens 8 Zeichen lang sein."
    if phone and not re.match(r"^\+?[0-9\s\-]+$", phone):
        return False, "Ungültige Telefonnummer."
    if not re.match(r"\d{4}-\d{2}-\d{2}", birthdate):
        return False, "Geburtsdatum muss im Format YYYY-MM-DD sein."
    try:
        datetime.strptime(birthdate, '%Y-%m-%d')
    except ValueError:
        return False, "Ungültiges Geburtsdatum."
    return True, ""

def validate_login_data(email, password):
    if not email or not password:
        return False, "E-Mail und Passwort sind erforderlich."
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False, "Ungültige E-Mail-Adresse."
    return True, ""