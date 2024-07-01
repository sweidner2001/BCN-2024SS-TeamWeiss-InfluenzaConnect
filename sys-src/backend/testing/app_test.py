import pytest
from flask import Flask
from werkzeug.security import generate_password_hash
from unittest.mock import patch
from app import app as flask_app

@pytest.fixture
def app():
    """
    Flask-App-Instanz für Tests.
    """
    yield flask_app

@pytest.fixture
def client(app):
    """
    Flask-Testclient für Anfragen.
    """
    return app.test_client()

def test_signup_success(client):
    """
    Testet die erfolgreiche Registrierung eines neuen Benutzers.
    """
    with patch('app.find_user_by_email', return_value=None):
        with patch('app.save_user', return_value=None):
            response = client.post('/signup', json={
                'form1': {
                    'email': 'test@example.com',
                    'passwort': 'strongpassword123'
                },
                'form2': {
                    'anrede': 'Herr',
                    'vorname': 'Max',
                    'nachname': 'Mustermann',
                    'land': 'Deutschland',
                    'telefonnr': '+491234567890',
                    'sprache': 'Deutsch',
                    'ueberMich': 'Hallo, ich bin Max.'
                },
                'form3': {
                    'instaUsername': 'validusername'
                }
            })
            assert response.status_code == 201
            assert response.json['message'] == 'Registrierung erfolgreich.'

def test_signup_existing_email(client):
    """
    Testet die Registrierung eines Benutzers mit einer bereits registrierten E-Mail-Adresse.
    """
    with patch('app.find_user_by_email', return_value={'email': 'test@example.com'}):
        response = client.post('/signup', json={
            'form1': {
                'email': 'test@example.com',
                'passwort': 'strongpassword123'
            },
            'form2': {
                'anrede': 'Herr',
                'vorname': 'Max',
                'nachname': 'Mustermann',
                'land': 'Deutschland',
                'telefonnr': '+491234567890',
                'sprache': 'Deutsch',
                'ueberMich': 'Hallo, ich bin Max.'
            },
            'form3': {
                'instaUsername': 'validusername'
            }
        })
        assert response.status_code == 400
        assert response.json['email'] == 'E-Mail-Adresse bereits registriert.'

def test_signup_invalid_data(client):
    """
    Testet die Registrierung mit ungültigen Eingabedaten.
    """
    response = client.post('/signup', json={
        'form1': {
            'email': 'invalidemail',
            'passwort': 'short'
        },
        'form2': {
            'anrede': '',
            'vorname': '',
            'nachname': '',
            'land': '',
            'telefonnr': '',
            'sprache': '',
            'ueberMich': ''
        },
        'form3': {
            'instaUsername': ''
        }
    })
    assert response.status_code == 400
    assert 'email' in response.json
    assert 'password' in response.json
    assert 'title' in response.json
    assert 'first_name' in response.json
    assert 'last_name' in response.json
    assert 'country' in response.json
    assert 'language' in response.json
    assert 'instagram_username' in response.json

def test_login_success(client):
    """
    Testet die erfolgreiche Anmeldung eines Benutzers.
    """
    hashed_password = generate_password_hash('strongpassword123', method='scrypt')
    with patch('app.find_user_by_email', return_value={'email': 'test@example.com', 'password': hashed_password}):
        response = client.post('/login', json={
            'email': 'test@example.com',
            'password': 'strongpassword123'
        })
        assert response.status_code == 200
        assert response.json['message'] == 'Anmeldung erfolgreich.'

def test_login_invalid_email(client):
    """
    Testet die Anmeldung mit einer ungültigen E-Mail-Adresse.
    """
    response = client.post('/login', json={
        'email': 'invalidemail',
        'password': 'strongpassword123'
    })
    assert response.status_code == 400
    assert 'email' in response.json

def test_login_invalid_password(client):
    """
    Testet die Anmeldung mit einem ungültigen Passwort.
    """
    hashed_password = generate_password_hash('strongpassword123', method='scrypt')
    with patch('app.find_user_by_email', return_value={'email': 'test@example.com', 'password': hashed_password}):
        response = client.post('/login', json={
            'email': 'test@example.com',
            'password': 'wrongpassword'
        })
        assert response.status_code == 401
        assert 'passwort' in response.json

def test_login_nonexistent_user(client):
    """
    Testet die Anmeldung mit einer nicht existierenden E-Mail-Adresse.
    """
    with patch('app.find_user_by_email', return_value=None):
        response = client.post('/login', json={
            'email': 'nonexistent@example.com',
            'password': 'strongpassword123'
        })
        assert response.status_code == 401
        assert 'passwort' in response.json

if __name__ == '__main__':
    pytest.main()
