import os

MONGO_URI               = os.getenv('MONGO_URI', 'mongodb://mongodb:27017')
DATABASE_NAME           = 'influencaConnect'
COLLECTION_REGISTRATION = 'registration'
COLLECTION_ANALYSIS     = 'analysis'
