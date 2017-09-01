import json
from flask import request, g, abort, jsonify, Response, url_for
from pymongo import MongoClient # Database connector
from bson.objectid import ObjectId # For ObjectId to work
from bson.json_util import dumps


client = MongoClient('localhost', 27017)  
db = client.mydb  
usersTbl = db.test 



def show(key):
    results = usersTbl.find()
    return  Response(dumps({'results': request.form['works']}), mimetype='application/json')

def show1():
	return "show one function"