from flask import Flask, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)


# Define routes
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/test', methods=['GET'])
def your_endpoint():
    return jsonify({"message": "Hello from backend!"})


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)