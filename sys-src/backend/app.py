from flask import Flask, jsonify, make_response, render_template, request, redirect, url_for
from flask_cors import CORS
#from pymongo import MongoClient, errors
from src import Scrape_Profile   

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# MongoDB client setup
#client = MongoClient('mongodb', 27017)  # Connect to MongoDB service
#db = client['InfluenzaDB']  # Select database

#test_collection = db['test']  # Collection for testing

# Define routes
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/process', methods=['POST'])

def scrape_Profile():
    param = request.args.get('param')
    if not param:
        return make_response(jsonify({"error": "Parameter 'param' is required"}), 400)
    try:
        profile_data = Scrape_Profile.process(param)
        return jsonify(profile_data)
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)
    
@app.route('/profile', methods=['POST'])
def profile():
    param = request.form.get('param')
    if not param:
        return render_template('input.html', error="Parameter 'param' is required"), 400
    try:
        profile_data = Scrape_Profile.process(param)
    except Exception as e:
        return render_template('input.html', error=str(e)), 500
    if profile_data is None:
        return render_template('input.html', error="Error processing profile"), 500
    return render_template('profile.html', profile=profile_data)



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