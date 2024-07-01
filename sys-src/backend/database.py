from pymongo import MongoClient
from config import MONGO_URI, DATABASE_NAME, COLLECTION_REGISTRATION, COLLECTION_ANALYSIS
import userinfo_scripts.categorization as categorization
import userinfo_scripts.user_analysis as analysis

# MongoDB-Verbindung herstellen
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
registration_collection = db[COLLECTION_REGISTRATION]
analysis_collection = db[COLLECTION_ANALYSIS]


def get_db_connection():
    """
    Stellt eine Verbindung zur MongoDB her und gibt die Collection zurück.

    Returns:
        Collection: Die Registrierungssammlung der Datenbank.
    """
    return registration_collection

def save_user(app, user_data):
    """
    Speichert die Benutzerdaten in der MongoDB.

    Args:
        app (Flask): Die Flask-App-Instanz zum Protokollieren von Fehlern.
        user_data (dict): Ein Wörterbuch mit den Benutzerdaten.

    Raises:
        Exception: Wenn beim Speichern des Benutzers ein Fehler auftritt.
    """
    try:
        # Ein Standardformat für den Benutzerdatensatz definieren
        standard_user_data = {
            'email': user_data.get('email', ''),
            'password': user_data.get('password', ''),
            'title': user_data.get('title', ''),
            'first_name': user_data.get('first_name', ''),
            'last_name': user_data.get('last_name', ''),
            'country': user_data.get('country', ''),
#             'state': user_data.get('state', ''),
            'phone': user_data.get('phone', ''),
            'language': user_data.get('language', ''),
            'about_me': user_data.get('about_me', ''),
            'instagram_username': user_data.get('instagram_username', '')
        }
        registration_collection.insert_one(standard_user_data)
    except Exception as e:
        app.logger.error(f"Error saving user: {e}")
        raise e

def find_user_by_email(app, email):
    """
    Findet einen Benutzer in der MongoDB anhand der E-Mail-Adresse.

    Args:
        app (Flask): Die Flask-App-Instanz zum Protokollieren von Fehlern.
        email (str): Die E-Mail-Adresse des Benutzers.

    Returns:
        dict: Die Benutzerdaten im Standardformat oder None, wenn der Benutzer nicht gefunden wird.

    Raises:
        Exception: Wenn beim Finden des Benutzers ein Fehler auftritt.
    """
    try:
        user = registration_collection.find_one({'email': email})
        if user:
            # Sicherstellen, dass das zurückgegebene Dokument alle Felder des Standardschemas enthält
            standard_user_data = {
                'email': user.get('email', ''),
                'password': user.get('password', ''),
                'title': user.get('title', ''),
                'first_name': user.get('first_name', ''),
                'last_name': user.get('last_name', ''),
                'country': user.get('country', ''),
#                 'state': user.get('state', ''),
                'phone': user.get('phone', ''),
                'language': user.get('language', ''),
                'about_me': user.get('about_me', ''),
                'instagram_username': user.get('instagram_username', '')
            }
            return standard_user_data
        return None
    except Exception as e:
        app.logger.error(f"Error finding user: {e}")
        raise e
    
def fetch_all_users(app):
    """
    Ruft alle Benutzerdaten aus der MongoDB ab.

    Returns:
        list: Eine Liste mit allen Benutzerdaten.
    """
    try:
        users = list(registration_collection.find())
        # Konvertieren der ObjectId in einen string für JSON
        for user in users:
            user['_id'] = str(user['_id'])
        return users
    except Exception as e:
        app.logger.error(f"Error fetching users: {e}")
        return []
