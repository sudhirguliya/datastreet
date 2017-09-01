import json
from flask import request, g, abort, jsonify, Response, url_for
from pymongo import MongoClient # Database connector
from bson.objectid import ObjectId # For ObjectId to work
from bson.json_util import dumps
import datetime
from array import array
from passlib.hash import sha256_crypt

client = MongoClient('localhost', 27017)  
db = client.mydb  



def company_data(key):
	objTbl = db.bis 
	result = objTbl.find({"company.cin_number": key})
	#return Response(dumps(results[0]['data']['charges'].count()),mimetype='application/json')
	#return dumps(results[0]['data']['charges'].count({}))
	json_data = dumps({'results': result})
	#json_data = json.dumps({"result":results})
	item_dict = json.loads(json_data)
	director = len(item_dict['results'][0]['company']['signatories'])
	charges  = len(item_dict['results'][0]['company']['charges'])
	total_result = {
	'director':director,
	'charges':charges,
	}
	return Response(dumps(total_result),mimetype='application/json')
	#return dumps(len(item_dict['results'][0]['data']['signatories']))

def company_total_data(key):
  objTbl = db.bis 
  result = objTbl.find_one({"company.cin_number": key})
  return Response(dumps(result),mimetype='application/json')

def director_record(key):
  objTbl = db.following 
  result = objTbl.find_one({"din_number": key})
  return Response(dumps(result),mimetype='application/json')

def rating(key,key1):
  objTbl = db.bis 
  result = objTbl.find_one({"company.cin_number": key,"rating.rating_agency":key1},{ "rating":1,"rating" : {"$elemMatch": {"rating_agency": key1}}})
  return Response(dumps(result),mimetype='application/json')

def business_activity(key,key1):
  objTbl = db.bis 
  result = objTbl.find_one({"company.cin_number":key1},{"business_activity.name":1,"business_activity.turnover":1,"business_activity.year":1})
  return Response(dumps(result),mimetype='application/json')

def director_non(key1):
  objTbl = db.bis 
  result = objTbl.find_one({"company.cin_number":key1},{"company.roc":1,"board_member.share":1,"company.charges":1,"board_member":1})
  return Response(dumps(result),mimetype='application/json')

def show1():
	return "show one function"

def industry_data(key):
	objTbl = db.industries 
	results = objTbl.find_one({"name": key})
	return Response(dumps(results),mimetype='application/json')
def company_by_industry_name(key):
	objTbl = db.bis 
	results = objTbl.find({"industry_type": 'IT'})
	return Response(dumps(results),mimetype='application/json')

def news_topic():
	objTbl = db.news 
	results = objTbl.find({}).distinct("Topic")
	return Response(dumps(results),mimetype='application/json')

def legal_topic():
  objTbl = db.legal 
  results = objTbl.find({}).distinct("Topic")
  return Response(dumps(results),mimetype='application/json')

def finacial_statement(key,key1,key2):
  if key1=='balance_sheet':
          objTbl = db.balance_sheet
  else:
          objTbl = db.profit_loss
  if key2=='one':
          results = objTbl.find_one({"cin_number":key},{"cin_number":0,"overview":0,"_id":0})
  else:
          c=key2.split(',')
          results = objTbl.find({"cin_number":{ "$in": c }},{"cin_number":0,"overview":0,"_id":0})
  return Response(dumps(results),mimetype='application/json')

def search(*args):
  request_param = request.args
  term  = request_param['term']
  type_select    = request_param['type_select']
  if type_select=='company':
          objTbl = db.bis
          consition = {"name": {"$regex": u""+term}}
          results = objTbl.find(consition,{"name":1,"_id":0})
  elif type_select=='industry':
          objTbl = db.industries
          consition = {"name": {"$regex": u""+term}}
          results = objTbl.find(consition,{"name":1,"_id":0})
  else:
          objTbl = db.director
          consition = {"name": {"$regex": u""+term}}
          results = objTbl.find(consition,{"name":1,"_id":0})

  return Response(dumps(results),mimetype='application/json')

def search_name(*args):
  request_param = request.args
  term  = request_param['term']
  type_select    = request_param['type_select']
  if type_select=='company':
          objTbl = db.bis
          consition = {"name":term}
          results = objTbl.find_one(consition,{"number":1,"_id":0,"industry_type":1})
  elif type_select=='industry':
          objTbl = db.industries
          consition = {"name": term}
          results = objTbl.find_one(consition,{"name":1,"_id":0})
  else:
          objTbl = db.director
          consition = {"name": {"$regex": u""+term}}
          results = objTbl.find_one(consition,{"number":1,"_id":0})

  return Response(dumps(results),mimetype='application/json')

def finacial_overview(key):
  objTbl = db.balance_sheet
  results = objTbl.find_one({"cin_number":key},{"_id":0})
  return Response(dumps(results),mimetype='application/json')

def trademark(key):
  objTbl = db.bis
  results = objTbl.find_one({"company.cin_number":key},{"company.trademark":1})
  return Response(dumps(results),mimetype='application/json')

def legal(key):
  objTbl = db.bis
  results = objTbl.find_one({"company.cin_number":key},{"company.legal":1})
  return Response(dumps(results),mimetype='application/json')

def following(key,key1):
  objTbl = db.following
  results = objTbl.find({"user_id":key,"type":key1})
  return Response(dumps(results),mimetype='application/json')

def following_director(key,key1):
  objTbl = db.following
  results = objTbl.find({"user_id":key,"type":key1})
  return Response(dumps(results),mimetype='application/json')

def get_news(*args):
    request_param = request.args
    objTbl = db.news
    if request.method =='GET' and 'fromDate' in request_param and 'toDate' in request_param and 'userType' in request_param  and 'userId' in request_param and 'catType' in request_param and 'topic' in request_param:
      
      fromDate  = request_param['fromDate']
      toDate    = request_param['toDate']
      userType  = request_param['userType']
      userId    = request_param['userId']
      catType   = request_param['catType']
      topic     = request_param['topic']
      where    ='';
      fromDate  = datetime.datetime.strptime(fromDate,'%d-%m-%Y')
      toDate    = datetime.datetime.strptime(toDate,'%d-%m-%Y')
      condition = {userType:userId,'Date':{'$gt':fromDate,'$lt':toDate}}

      if catType=='social':
          objTbl = db.social
      elif catType=='legal':
          objTbl = db.legal
      else:
          objTbl= db.news
      if topic !='':
          condition = {userType:userId,'Topic':topic,'Date':{'$gt':fromDate,'$lt':toDate}}

      #where = where.rstrip(",")
      result=objTbl.find(condition)
      #return Response(where)
    
      #UserType(Key) =>Industry/CIN/DIN & UserId(Val)

      #getMonth  = datetime.datetime.now().strftime('%B')
      
      #fromDate  = datetime.datetime.strptime(fromDate,'%d-%m-%Y')
      #toDate    = datetime.datetime.strptime(toDate,'%d-%m-%Y')
      
      key       = 'function(doc) { return { month_of_year:doc.Date.getMonth()}}'
      #condition = {'NewsDate':{'$gt':fromDate,'$lt':toDate}}
      initial   = { 'total' : 0, 'count': 0 }
      reducer   = 'function(curr,result){result.total += 1 ; result.count++; }'
      finalize  = "function(result){ yearmonths=[\"January\",\"February\",\"March\", \"April\",\"May\",\"June\",\"August\",\"September\", \"October\",\"November\", \"December\"];result.month_of_year= yearmonths[result.month_of_year];result.avg = Math.round(result.total / result.count);}"


      newsData=objTbl.group(key, condition, initial, reducer,finalize)

      count_list = []
      month_list = []
      for item in newsData:
      	count_list.append(item['count'])
      	month_list.append(item['month_of_year'])
      

      return Response(dumps({"response":{ 
                                   "status": "200", 
                                   "message": "News List",
                                   'full_data':result,
                                   "countList":count_list,'monthList':month_list  }  }), mimetype='application/json')
    else :
        return Response(dumps({"response":{ 
                                   "status": "0", 
                                   "message": "Missing required param",
                                   }  }), mimetype='application/json')

def rating_details(key,key1,key2,key3,key4):
    objTbl = db.rating 
    cin     = key,
    rating=key1
    r_type=key2
    fromDate  = key3
    toDate    = key4
    where    ='';
    fromDate  = datetime.datetime.strptime(fromDate,'%d-%m-%Y')
    toDate    = datetime.datetime.strptime(toDate,'%d-%m-%Y')
    if r_type=='all':
      condition = {'cin':key,'rating':key1,'Date':{'$gt':fromDate,'$lt':toDate}}
    else:
      condition = {'cin':key,'rating':key1,'type':key2,'Date':{'$gt':fromDate,'$lt':toDate}}
    result=objTbl.find(condition)
    key       = 'function(doc) { return { month_of_year:doc.Date.getMonth()}}'
    #condition = {'NewsDate':{'$gt':fromDate,'$lt':toDate}}
    initial   = { 'total' : 0, 'count': 0 }
    reducer   = 'function(curr,result){result.total += 1 ; result.count++; }'
    finalize  = "function(result){ yearmonths=[\"January\",\"February\",\"March\", \"April\",\"May\",\"June\",\"August\",\"September\", \"October\",\"November\", \"December\"];result.month_of_year= yearmonths[result.month_of_year];result.avg = Math.round(result.total / result.count);}"


    newsData=objTbl.group(key, condition, initial, reducer,finalize)
    count_list = []
    month_list = []
    for item in newsData:
      count_list.append(item['count'])
      month_list.append(item['month_of_year'])
    

    return Response(dumps({"response":{ 
                                 "status": "200", 
                                 "message": "News List",
                                 'full_data':result,
                                 "countList":count_list,'monthList':month_list  }  }), mimetype='application/json')

def login():
  usersTbl = db.users
  planTbl  = db.plan_master 
  user_data = request.json

  if request.method =='POST' and 'email' in user_data and 'password' in user_data :
    if user_data['email'] and user_data['password']:

      userLogin = usersTbl.find_one({"email":user_data['email']})
      # return dumps(userLogin['plan_id'])

      if 'password' in userLogin and sha256_crypt.verify(user_data['password'],userLogin['password']):
        if 'plan_id' in userLogin and userLogin['plan_id']:
             del(userLogin['password'])
             userPlan = planTbl.find_one({"_id":ObjectId(userLogin['plan_id'])})
             userLogin['userPlan'] = userPlan
        else :
             userLogin['userPlan'] = ""
        return Response(dumps({"response": { 
                               "status": "200",
                               "message": "Login success", 
                               "data":userLogin }}), mimetype='application/json') 
        
      else :
        return Response(dumps({"response": { 
                               "status": "401",
                               "message": "Invalid email or password",
                               "data":"" }}), mimetype='application/json')
    else :
        return Response(dumps({"response": {
                               "status": "401",
                               "message": "Missing email or password",
                               "data":""  } }), mimetype='application/json')                   
  else:
      return Response(dumps({"response":{ 
                             "status": "401", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')

#GET director information by DIN

def director_info(*args):
  request_param = request.args
  objTbl = db.bis
  if request.method =='GET' and 'din' in request_param:
    din =request_param['din']

    directorInfo = objTbl.find_one({"company.signatories.DIN": din},{"company.signatories.main_data":1,"company.signatories.pan_data":1})
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "director information",
                             "data":directorInfo  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')

#GET director's Company by CIN

def director_by_company(*args):
  request_param = request.args
  dcrTbl = db.bis
  if request.method =='GET' and 'cin' in request_param:
    cin =request_param['cin']
    cmpInfo = dcrTbl.find_one({"company.cin_number": cin},{"company.signatories.main_data":1,"company.signatories.pan_data":1})
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "directors list",
                             "data":cmpInfo  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')

#GET document loist by CIN

def document_list(*args):
  request_param = request.args
  dcrTbl = db.documents
  if request.method =='GET' and 'cin' in request_param:
    cin =request_param['cin']
    cmpInfo = dcrTbl.find({"CIN": cin},{"data":1, 'CategoryName':1})
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "directors list",
                             "data":cmpInfo  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')

#GET director information by DIN


def director_equity(*args):
  request_param = request.args
  objTbl = db.bis
  if request.method =='GET' and 'din' in request_param:
    din =request_param['din']

    result= objTbl.find( {"board_member.DIN": din}, {"company.roc": 1,"board_member": {"$elemMatch": {"DIN": din}}});
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "director equity list",
                             "data":result  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')

#GET director company list

def director_company(*args):
  request_param = request.args
  objTbl = db.bis
  if request.method =='GET' and 'din' in request_param:
    din =request_param['din']

    result= objTbl.find( {"board_member.DIN": din}, {"company.roc.CIN": 1,"company.roc.COMPANY_NAME": 1});
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "director equity list",
                             "data":result  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')

#GET Blance Sheet information by DIN

def blance_sheet(*args):
  request_param = request.args
  objTbl = db.balance_sheet
  if request.method =='GET' and 'company' in request_param:
    company = request_param['company']
    companyArr = company.split(',')

    result= objTbl.find_one( {"cin_number": {'$in':companyArr} },{'_id':0,'overview':0,"cin_number":0,"company_name":0});
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "blansheet list",
                             "data":result  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')

#GET Blance Sheet information by DIN

def get_portfolio(*args):
  request_param = request.args
  objTbl = db.balance_sheet
  if request.method =='GET' and 'company' in request_param:
    company = request_param['company']
    companyArr = company.split(',')

    result= objTbl.find( {"cin_number": {'$in':companyArr} },{'_id':0,'overview':0,"cin_number":0});
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "blansheet list",
                             "data":result  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')


#GET Blance Sheet information by DIN

def get_ratio_type(*args):
  request_param = request.args
  objTbl = db.bis
  if request.method =='GET' and 'cin' in request_param:
    cin = request_param['cin']


    result= objTbl.find_one( {'company.cin_number':cin},{'industry_type':1});
    industry_type = result['industry_type']
    rType= objTbl.find_one( {"financial_ratio.Industry": industry_type,"financial_ratio.CIN": cin}, {"financial_ratio":1});
    compType= objTbl.find_one( {"financial_ratio.Industry": industry_type,"financial_ratio.CIN": cin}, {"company.roc.CIN":1,"company.roc.COMPANY_NAME":1});
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "blansheet list",
                             "industry_type":industry_type,"ratiotype":rType,'company':compType  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')

#GET director's Compan by DIN

def company_by_director(*args):
  request_param = request.args
  dcrTbl = db.bis
  if request.method =='GET' and 'din' in request_param:
    din =request_param['din']
    dcrInfo = dcrTbl.find({"company.signatories.DIN": din},{"company.roc":1})
    return Response(dumps({"response":{ 
                             "status": "200", 
                             "message": "Associated companies list of director",
                             "data":dcrInfo  }  }), mimetype='application/json')
  else :
    return Response(dumps({"response":{ 
                             "status": "0", 
                             "message": " Missing required param",
                             "data":""  }  }), mimetype='application/json')


  