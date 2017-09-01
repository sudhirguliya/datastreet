import json
from flask import request, g, abort, jsonify, Response, url_for
from pymongo import MongoClient # Database connector
from bson.objectid import ObjectId # For ObjectId to work
from bson.json_util import dumps


client = MongoClient('localhost', 27017)  
db = client.mydb  
usersTbl = db.street 



def search_filter(key):
    results = usersTbl.find({"data.COMPANY_NAME": {"$regex": u""+request.form['works']}},{'data.COMPANY_NAME':1})
    return  Response(dumps({'results': results}), mimetype='application/json')

def show1():
	return "show one function"