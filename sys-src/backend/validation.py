import re
from datetime import datetime
import requests
from bs4 import BeautifulSoup

def validate_registration_data(email, password, title, first_name, last_name, country, phone, language, about_me, instagram_username):
    """
    Validiert die Registrierungsdaten für einen neuen Benutzer.

    Args:
        email (str): Die E-Mail-Adresse des Benutzers.
        password (str): Das Passwort des Benutzers.
        title (str): Der Titel des Benutzers (z.B. "Herr", "Frau").
        first_name (str): Der Vorname des Benutzers.
        last_name (str): Der Nachname des Benutzers.
        country (str): Das Land des Benutzers.
        state (str): Der Bundesstaat/die Region des Benutzers.
        phone (str): Die Telefonnummer des Benutzers (optional).
        language (str): Die bevorzugte Sprache des Benutzers.
        about_me (str): Eine kurze Beschreibung des Benutzers (optional).
        instagram_username (str): Der Instagram-Benutzername des Benutzers.

    Returns:
        tuple: Ein Tupel mit zwei Elementen:
            - bool: True, wenn die Daten gültig sind, andernfalls False.
            - lsit: Fehlerliste mit Spaltenangabe
    """
    errors = {}

    if not email:
        errors["email"] = "E-Mail ist erforderlich."
    elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        errors["email"] = "Ungültige E-Mail-Adresse."

    if not password:
        errors["password"] = "Passwort ist erforderlich."
    elif len(password) < 10:
        errors["password"] = "Passwort muss mindestens 10 Zeichen lang sein."

    if not title:
        errors["title"] = "Titel ist erforderlich."

    if not first_name:
        errors["first_name"] = "Vorname ist erforderlich."

    if not last_name:
        errors["last_name"] = "Nachname ist erforderlich."

    if not country:
        errors["country"] = "Land ist erforderlich."

    if not language:
        errors["language"] = "Sprache ist erforderlich."

    if not instagram_username:
        errors["instagram_username"] = "Instagram-Username ist erforderlich."
    elif not validate_instagram_username(instagram_username):
        errors["instagram_username"] = "Ungültiger oder nicht existierender Instagram-Username."

    if phone and not re.match(r"^\+?[0-9\s\-]+$", phone):
        errors["phone"] = "Ungültige Telefonnummer."

    if errors:
        return False, errors

    return True, {}


def validate_login_data(email, password):
    """
    Validiert die Logindaten eines Benutzers.

    Args:
        email (str): Die E-Mail-Adresse des Benutzers.
        password (str): Das Passwort des Benutzers.

    Returns:
        tuple: Ein Tupel mit zwei Elementen:
            - bool: True, wenn die Daten gültig sind, andernfalls False.
            - str: Eine Fehlermeldung, wenn die Daten ungültig sind, andernfalls eine leere Zeichenkette.
    """
    errors = {}

    if not email:
        errors["email"] = "E-Mail ist erforderlich."
    elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        errors["email"] = "Ungültige E-Mail-Adresse."

    if not password:
        errors["password"] = "Passwort ist erforderlich."

    if errors:
        return False, errors

    return True, {}


def validate_instagram_username(username):
    """
    Überprüft, ob ein Instagram-Benutzername gültig und öffentlich ist.

    Args:
        username (str): Der Instagram-Benutzername.

    Returns:
        bool: True, wenn der Benutzername gültig und öffentlich ist, andernfalls False.
    """
    url = f"https://www.instagram.com/{username}/"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        is_private = soup.find('meta', property='og:description')['content'].find('•') != -1
        return not is_private
    return False


def validate_age(birthdate):
    """
    Überprüft, ob ein Benutzer mindestens 18 Jahre alt ist, basierend auf seinem Geburtsdatum.

    Args:
        birthdate (str): Das Geburtsdatum im Format "YYYY-MM-DD".

    Returns:
        bool: True, wenn der Benutzer mindestens 18 Jahre alt ist, andernfalls False.
    """
    try:
        birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
        today = datetime.today()
        age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
        return age >= 18
    except ValueError:
        return False