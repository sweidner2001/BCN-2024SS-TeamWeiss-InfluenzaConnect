import re
from datetime import datetime

def validate_registration_data(name, birthdate, country, languages, email, password, phone=None):
    if not name or not birthdate or not country or not languages or not email or not password:
        return False, "Alle Felder außer Telefonnr. sind erforderlich."
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False, "Ungültige E-Mail-Adresse."
    if len(password) < 8:
        return False, "Passwort muss mindestens 8 Zeichen lang sein."
    if not re.match(r"\d{4}-\d{2}-\d{2}", birthdate):
        return False, "Geburtsdatum muss im Format YYYY-MM-DD sein."
    try:
        datetime.strptime(birthdate, '%Y-%m-%d')
    except ValueError:
        return False, "Ungültiges Geburtsdatum."
    return True, ""
