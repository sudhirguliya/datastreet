import json
from flask import request, g, abort, jsonify, Response, url_for
from pymongo import MongoClient # Database connector
from bson.objectid import ObjectId # For ObjectId to work
from bson.json_util import dumps


client = MongoClient('localhost', 27017)  
db = client.mydb  
usersTbl = db.company 



def company_data(key):
	results = usersTbl.find({"data.cin_number": 'U27109WB2004PTC097743'})
	#return Response(dumps(results[0]['data']['charges'].count()),mimetype='application/json')
	#return dumps(results[0]['data']['charges'].count({}))
	json_data = dumps({'results': results})
	#json_data = json.dumps({"result":results})
	item_dict = json.loads(json_data)
	return dumps(len(item_dict['results'][0]['data']['signatories']))

def show1():
	return "show one function"