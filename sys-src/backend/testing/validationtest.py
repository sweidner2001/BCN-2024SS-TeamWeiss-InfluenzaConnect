import pytest
from validation import validate_registration_data, validate_age, validate_instagram_username

def test_validate_registration_data():
    # Gültige Daten
    valid_data = {
        'email': 'test@example.com',
        'password': 'password123',
        'title': 'Herr',
        'first_name': 'Max',
        'last_name': 'Mustermann',
        'country': 'Deutschland',
        'state': 'Bayern',
        'phone': '+491234567890',
        'language': 'Deutsch',
        'about_me': 'Ich bin Max.',
        'instagram_username': 'valid_user',
        'birthdate': '2000-01-01'
    }
    is_valid, message = validate_registration_data(**valid_data)
    assert is_valid, message

    # Ungültige E-Mail
    invalid_email = valid_data.copy()
    invalid_email['email'] = 'invalid-email'
    is_valid, message = validate_registration_data(**invalid_email)
    assert not is_valid
    assert message == "Ungültige E-Mail-Adresse."

    # Zu kurzes Passwort
    short_password = valid_data.copy()
    short_password['password'] = 'short'
    is_valid, message = validate_registration_data(**short_password)
    assert not is_valid
    assert message == "Passwort muss mindestens 8 Zeichen lang sein."

    # Ungültige Telefonnummer
    invalid_phone = valid_data.copy()
    invalid_phone['phone'] = 'invalid_phone'
    is_valid, message = validate_registration_data(**invalid_phone)
    assert not is_valid
    assert message == "Ungültige Telefonnummer."

    # Zu jung
    too_young = valid_data.copy()
    too_young['birthdate'] = '2010-01-01'
    is_valid, message = validate_registration_data(**too_young)
    assert not is_valid
    assert message == "Der Benutzer muss mindestens 18 Jahre alt sein."

    # Ungültiger Instagram-Username
    invalid_instagram = valid_data.copy()
    invalid_instagram['instagram_username'] = 'this_user_does_not_exist_12345'
    is_valid, message = validate_registration_data(**invalid_instagram)
    assert not is_valid
    assert message == "Ungültiger oder nicht existierender Instagram-Username."

def test_validate_age():
    # Gültiges Datum (über 18)
    assert validate_age('2000-01-01') == True

    # Ungültiges Datum (unter 18)
    assert validate_age('2010-01-01') == False

    # Ungültiges Datum Format
    assert validate_age('invalid-date') == False

def test_validate_instagram_username():
    # Gültiger Instagram-Username
    assert validate_instagram_username('instagram') == True  # Beispiel: 'instagram' sollte öffentlich sein

    # Ungültiger Instagram-Username
    assert validate_instagram_username('this_user_does_not_exist_12345') == False
