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
test_collection = db['test']  # Collection for testing

# Define routes
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/test', methods=['GET'])
def your_endpoint():
    return jsonify({"message": "Hello from backend!"})


@app.route('/testdb', methods=['GET'])
def test_db():
    try:
        result = test_collection.insert_one({"message": "Hello from MongoDB!"})
        return jsonify({"message": "Data inserted successfully!", "id": str(result.inserted_id)})
    except errors.PyMongoError as e:
        app.logger.error(f"Error inserting data into MongoDB: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)