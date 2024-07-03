import pytest
from flask import Flask
from mongomock import MongoClient as MockMongoClient  # Mock für pymongo
from app import save_user, find_user_by_email
from config import  DATABASE_NAME, COLLECTION_NAME

# Fixture für die Verbindung zur Testdatenbank
@pytest.fixture
def setup_database():
    """
    Fixture für die Vorbereitung der Datenbankverbindung.
    Verwendet mongomock, um eine mock MongoDB-Instanz zu erstellen.
    """
    # Mock für MongoClient verwenden
    mock_client = MockMongoClient()
    db = mock_client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]
    
    yield collection  # Die Collection wird an die Tests übergeben
    
    # Nach jedem Test die Datenbank löschen
    collection.drop()

# Testdaten für Benutzer
test_user_data = {
    'email': 'testuser@example.com',
    'password': 'hashedpassword',
    'title': 'Herr',
    'first_name': 'Test',
    'last_name': 'User',
    'country': 'Deutschland',
    'phone': '+491234567890',
    'language': 'Deutsch',
    'about_me': 'Testbenutzer',
    'instagram_username': 'testuser'
}

def test_save_user(setup_database, app):
    """
    Testet die Funktion save_user in der Datenbank.
    """
    save_user(app, test_user_data)
    
    # Überprüfen, ob der Benutzer in der Datenbank gespeichert wurde
    result = setup_database.find_one({'email': 'testuser@example.com'})
    assert result is not None
    assert result['first_name'] == 'Test'

def test_find_user_by_email_existing(setup_database, app):
    """
    Testet die Funktion find_user_by_email für einen vorhandenen Benutzer.
    """
    setup_database.insert_one(test_user_data)
    
    result = find_user_by_email(app, 'testuser@example.com')
    assert result is not None
    assert result['first_name'] == 'Test'

def test_find_user_by_email_non_existing(setup_database, app):
    """
    Testet die Funktion find_user_by_email für einen nicht vorhandenen Benutzer.
    """
    result = find_user_by_email(app, 'nonexistent@example.com')
    assert result is None

# Flask-App-Instanz für das Protokollieren von Fehlern
@pytest.fixture
def app():
    """
    Flask-App-Instanz für Tests.
    """
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['DEBUG'] = False
    return app
