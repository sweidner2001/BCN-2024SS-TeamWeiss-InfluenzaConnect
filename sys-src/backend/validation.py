import re
from datetime import datetime
import requests
from bs4 import BeautifulSoup

def validate_registration_data(email, password, title, first_name, last_name, country, state, phone, language, about_me, instagram_username):
    if not email or not password or not title or not first_name or not last_name or not country or not state or not language or not instagram_username:
        return False, "Alle Felder außer Telefonnummer und Über mich sind erforderlich."
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False, "Ungültige E-Mail-Adresse."
    if len(password) < 10:
        return False, "Passwort muss mindestens 10 Zeichen lang sein."
    if phone and not re.match(r"^\+?[0-9\s\-]+$", phone):
        return False, "Ungültige Telefonnummer."
    if instagram_username and not validate_instagram_username(instagram_username):
        return False, "Ungültiger oder nicht existierender Instagram-Username."
    return True, ""

def validate_login_data(email, password):
    if not email or not password:
        return False, "E-Mail und Passwort sind erforderlich."
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False, "Ungültige E-Mail-Adresse."
    return True, ""

def validate_instagram_username(username):
    url = f"https://www.instagram.com/{username}/"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        is_private = soup.find('meta', property='og:description')['content'].find('•') != -1
        return not is_private
    return False

def validate_age(birthdate):
    try:
        birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
        today = datetime.today()
        age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
        return age >= 18
    except ValueError:
        return False