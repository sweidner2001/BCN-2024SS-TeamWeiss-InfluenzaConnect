from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from pymongo import MongoClient, errors
from bson.objectid import ObjectId

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# MongoDB client setup
client = MongoClient('mongodb', 27017)  # Connect to MongoDB service
db = client['InfluenzaDB']  # Select database
registration_collection = db['registration']  # Collection für Registrierungsdaten

# Route zum Abrufen aller Registrierungsdaten
@app.route('/registrations', methods=['GET'])
def get_registrations():
    try:
        data = list(registration_collection.find())
        for item in data:
            item["_id"] = str(item["_id"])
        return jsonify(data)
    except errors.PyMongoError as e:
        app.logger.error(f"Error fetching data from MongoDB: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# Route zum Aktualisieren von Registrierungsdaten
@app.route('/register/<id>', methods=['PUT'])
def update_registration(id):
    data = request.json
    try:
        result = registration_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count > 0:
            return jsonify({"message": "Update successful"})
        else:
            return jsonify({"message": "No document found with that ID"}), 404
    except errors.PyMongoError as e:
        app.logger.error(f"Error updating data in MongoDB: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# Route zum Löschen von Registrierungsdaten
@app.route('/register/<id>', methods=['DELETE'])
def delete_registration(id):
    try:
        result = registration_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return jsonify({"message": "Delete successful"})
        else:
            return jsonify({"message": "No document found with that ID"}), 404
    except errors.PyMongoError as e:
        app.logger.error(f"Error deleting data from MongoDB: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)