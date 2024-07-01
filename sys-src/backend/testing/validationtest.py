import pytest

# Importiere die zu testenden Funktionen
from validation import validate_registration_data, validate_login_data, validate_instagram_username, validate_age

def test_validate_registration_data_valid():
    """
    Testet die validate_registration_data-Funktion mit gültigen Eingabedaten.
    """
    result, errors = validate_registration_data(
        email="test@example.com",
        password="strongpassword123",
        title="Herr",
        first_name="Max",
        last_name="Mustermann",
        country="Deutschland",
        phone="+491234567890",
        language="Deutsch",
        about_me="Hallo, ich bin Max.",
        instagram_username="validusername"
    )
    assert result is True
    assert not errors

def test_validate_registration_data_invalid_email():
    """
    Testet die validate_registration_data-Funktion mit einer ungültigen E-Mail-Adresse.
    """
    result, errors = validate_registration_data(
        email="invalidemail",
        password="strongpassword123",
        title="Herr",
        first_name="Max",
        last_name="Mustermann",
        country="Deutschland",
        phone="+491234567890",
        language="Deutsch",
        about_me="Hallo, ich bin Max.",
        instagram_username="validusername"
    )
    assert result is False
    assert "email" in errors

def test_validate_registration_data_short_password():
    """
    Testet die validate_registration_data-Funktion mit einem zu kurzen Passwort.
    """
    result, errors = validate_registration_data(
        email="test@example.com",
        password="short",
        title="Herr",
        first_name="Max",
        last_name="Mustermann",
        country="Deutschland",
        phone="+491234567890",
        language="Deutsch",
        about_me="Hallo, ich bin Max.",
        instagram_username="validusername"
    )
    assert result is False
    assert "password" in errors

def test_validate_login_data_valid():
    """
    Testet die validate_login_data-Funktion mit gültigen Eingabedaten.
    """
    result, errors = validate_login_data(email="test@example.com", password="strongpassword123")
    assert result is True
    assert not errors

def test_validate_login_data_invalid_email():
    """
    Testet die validate_login_data-Funktion mit einer ungültigen E-Mail-Adresse.
    """
    result, errors = validate_login_data(email="invalidemail", password="strongpassword123")
    assert result is False
    assert "email" in errors

def test_validate_login_data_missing_password():
    """
    Testet die validate_login_data-Funktion mit einem fehlenden Passwort.
    """
    result, errors = validate_login_data(email="test@example.com", password="")
    assert result is False
    assert "password" in errors

def test_validate_instagram_username_valid(mocker):
    """
    Testet die validate_instagram_username-Funktion mit einem gültigen und öffentlichen Instagram-Benutzernamen.
    """
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.text = '<meta property="og:description" content="testuser">'

    mocker.patch('requests.get', return_value=mock_response)

    result = validate_instagram_username("validusername")
    assert result is True

def test_validate_instagram_username_invalid(mocker):
    """
    Testet die validate_instagram_username-Funktion mit einem ungültigen Instagram-Benutzernamen.
    """
    mock_response = mocker.Mock()
    mock_response.status_code = 404

    mocker.patch('requests.get', return_value=mock_response)

    result = validate_instagram_username("invalidusername")
    assert result is False

def test_validate_age_valid():
    """
    Testet die validate_age-Funktion mit einem Benutzer, der mindestens 18 Jahre alt ist.
    """
    result = validate_age("2000-01-01")
    assert result is True

def test_validate_age_invalid():
    """
    Testet die validate_age-Funktion mit einem Benutzer, der jünger als 18 Jahre ist.
    """
    result = validate_age("2010-01-01")
    assert result is False

def test_validate_age_invalid_date():
    """
    Testet die validate_age-Funktion mit einem ungültigen Geburtsdatum.
    """
    result = validate_age("invalid-date")
    assert result is False

if __name__ == "__main__":
    pytest.main()
