from pymongo import MongoClient
from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME

# MongoDB-Verbindung herstellen
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
registration_collection = db[COLLECTION_NAME]

def get_db_connection():
    return registration_collection

def save_user(app, user_data):
    try:
        # Ein Standardformat für den Benutzerdatensatz definieren
        standard_user_data = {
            'email': user_data.get('email', ''),
            'password': user_data.get('password', ''),
            'title': user_data.get('title', ''),
            'first_name': user_data.get('first_name', ''),
            'last_name': user_data.get('last_name', ''),
            'country': user_data.get('country', ''),
            'state': user_data.get('state', ''),
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
                'state': user.get('state', ''),
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
