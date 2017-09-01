import blue
import company
import search

from flask import Blueprint

from flask_cors import CORS

blueprint = Blueprint('1.0', __name__)	

#to handle cors
CORS(blueprint)

blueprint.add_url_rule('/blue/<int:key>/', 'show', blue.show,methods=['GET', 'PUT', 'POST'])
blueprint.add_url_rule('/search/<int:key>/', 'search_filter', search.search_filter,methods=['GET', 'PUT', 'POST'])
blueprint.add_url_rule('/company/<string:key>/', 'company_data', company.company_data,methods=['GET'])
blueprint.add_url_rule('/rating/<string:key>/<string:key1>/', 'rating', company.rating,methods=['GET'])
blueprint.add_url_rule('/company_record/<string:key>/', 'company_total_data', company.company_total_data,methods=['GET'])
blueprint.add_url_rule('/business_act/<string:key>/<string:key1>/', 'business_activity', company.business_activity,methods=['GET'])
blueprint.add_url_rule('/director_non/<string:key1>/', 'director_non', company.director_non,methods=['GET'])
blueprint.add_url_rule('/company_by_industry_name/<int:key>/', 'company_by_industry_name', company.company_by_industry_name,methods=['GET'])
blueprint.add_url_rule('/get_news/', 'get_news', company.get_news,methods=['GET'])
blueprint.add_url_rule('/search/', 'search', company.search,methods=['GET'])
blueprint.add_url_rule('/search_name/', 'search_name', company.search_name,methods=['GET'])
blueprint.add_url_rule('/industry/<string:key>/', 'industry_data', company.industry_data,methods=['GET'])
blueprint.add_url_rule('/news_topic/', 'news_topic', company.news_topic,methods=['GET'])
blueprint.add_url_rule('/legal_topic/', 'legal_topic', company.legal_topic,methods=['GET'])
blueprint.add_url_rule('/blue1/', 'show1', blue.show1)
blueprint.add_url_rule('/finacial_statement/<string:key>/<string:key1>/<string:key2>/', 'finacial_statement', company.finacial_statement,methods=['GET'])
blueprint.add_url_rule('/finacial_overview/<string:key>/', 'finacial_overview', company.finacial_overview,methods=['GET'])
blueprint.add_url_rule('/trademark/<string:key>/','trademark',company.trademark,methods=['GET'])
blueprint.add_url_rule('/legal/<string:key>/','legal',company.legal,methods=['GET'])
blueprint.add_url_rule('/rating_details/<string:key>/<string:key1>/<string:key2>/<string:key3>/<string:key4>/', 'rating_details', company.rating_details,methods=['GET'])
blueprint.add_url_rule('/login/','login',company.login,methods=['POST'])
blueprint.add_url_rule('/following/<string:key>/<string:key1>/','following',company.following,methods=['GET'])
blueprint.add_url_rule('/following_director/<string:key>/<string:key1>/','following_director',company.following_director,methods=['GET'])
blueprint.add_url_rule('/director_record/<string:key>/', 'director_record', company.director_record,methods=['GET'])
blueprint.add_url_rule('/company_by_director/', 'company_by_director', company.company_by_director, methods=['GET'])
#director


blueprint.add_url_rule('/director_info/', 'director_info', company.director_info, methods=['GET'])
blueprint.add_url_rule('/director_equity/', 'director_equity', company.director_equity, methods=['GET'])
blueprint.add_url_rule('/blance_sheet', 'blance_sheet', company.blance_sheet, methods=['GET'])
blueprint.add_url_rule('/get_portfolio', 'get_portfolio', company.get_portfolio, methods=['GET'])
blueprint.add_url_rule('/director_company', 'director_company', company.director_company, methods=['GET'])
#blueprint.add_url_rule('/pwd_hash/', 'pwd_hash', api.pwd_hash, methods=['GET'])

blueprint.add_url_rule('/ratio_type/', 'ratio_type', company.get_ratio_type, methods=['GET'])

blueprint.add_url_rule('/director_list/', 'director_list', company.director_by_company, methods=['GET'])
blueprint.add_url_rule('/document_list/', 'document_list', company.document_list, methods=['GET'])
# hello world
# hello world
#blueprint.add_url_rule('/hello/', 'world', hello.world)
#blueprint.add_url_rule('/tasks/', 'get_tasks', hello.get_tasks)


#blueprint.add_url_rule('/get_addresses/', 'get_addresses', products.get_addresses)

#sample 
# blueprint.add_url_rule('/products/<product_id>/', 'update_product', products.update_product, methods=['POST'])