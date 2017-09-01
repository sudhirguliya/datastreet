import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response,URLSearchParams,Jsonp } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import {credentials} from '../_guards/crediential';
import  * as fs  from 'fs';
import { Industry } from '../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class CompanyService {

    constructor(private http: Http,private jsonp: Jsonp) { }
    getAll(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/company/'+val+'/').map((response: Response) => response.json())
    }
    getSub(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/company/'+val+'/').map((response: Response) => response.json())
    }
    getRating(val:string,val2:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/rating/'+val+'/'+val2+'/').map((response: Response) => response.json())
    }
    getRatingDetails(val:string,val2:string,val3:string,val4:string,val5:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/rating_details/'+val+'/'+val2+'/'+val3+'/'+val4+'/'+val5+'/').map((response: Response) => response.json())
    }
    getCompany(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/company_record/'+val+'/').map((response: Response) => response.json())
    }
    getDirector(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/director_record/'+val+'/').map((response: Response) => response.json())
    }

    getBusiness(val:string,val1:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/business_act/'+val+'/'+val1+'/').map((response: Response) => response.json())
    }
    getBusinesss(val:string,val1:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/business_act/'+val+'/'+val1+'/').map((response: Response) => response.json())
    }
    getEquity(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/director_non/'+val+'/').map((response: Response) => response.json())
    }
    search(term: string, type:string) {
    var search = new URLSearchParams()
    search.set('term', term);
    search.set('type_select',type);
    return this.http
                .get('http://127.0.0.1:5002/1.0/search/', { search })
                .map((request) => request.json());
  }
  search_name(term: string, type:string) {
    var search = new URLSearchParams()
    search.set('term', term);
    search.set('type_select',type);
    return this.http
                .get('http://127.0.0.1:5002/1.0/search_name/', { search })
                .map((request) => request.json());
  }

}