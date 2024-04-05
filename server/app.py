from flask import Flask
from config import HOST, PORT, DEBUG
from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def index():
    return '<h1>REST API successfully running</h1>'


@app.route('/get_data', methods=['GET'])
def get_data():
    url = "https://api.thingspeak.com/channels/2465663/fields/1.json?api_key=MP0MEWPWMADVCPMG&results=2"
    response = requests.get(url)
    data = response.json()
    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000', debug=True)
