import os
from flask import Flask, session
from flask_cors import CORS, cross_origin

from blue import blueprint



import API_v1

app = Flask(__name__)

#to handle cors
CORS(app, supports_credentials=True)


# Set up blueprints for each API version
app.register_blueprint(API_v1.blueprint, url_prefix='/1.0')

if __name__ == '__main__':
	app.run(host='127.0.0.1', port=5002, debug=True, threaded=True)