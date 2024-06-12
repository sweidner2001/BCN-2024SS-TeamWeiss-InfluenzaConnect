from pymongo import MongoClient
from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME

# MongoDB-Verbindung herstellen
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
registration_collection = db[COLLECTION_NAME]

def get_db_connection():
    return registration_collection

def save_user(user_data):
    registration_collection.insert_one(user_data)

def find_user_by_email(email):
    return registration_collection.find_one({'email': email})
