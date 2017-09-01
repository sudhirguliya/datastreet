import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import {credentials} from '../_guards/crediential';
import  * as fs  from 'fs';
import { Industry } from '../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class IndustryService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://127.0.0.1:5002/1.0/industry/1/').map((response: Response) => response.json())
    }
    getNewsTopic(){
        return this.http.get('http://127.0.0.1:5002/1.0/news_topic/').map((response: Response) => response.json())
    }
    getTopPlayers() {
        return this.http.get('http://127.0.0.1:5002/1.0/company_by_industry_name/1/').map((response: Response) => response.json());
    }
    get_news_details_sub(val:string,val2:string,val3:string)
    {
        if(val=='all')
        {
            val='';
        }
        return this.http.get('http://127.0.0.1:5002/1.0/get_news?fromDate=01-01-2017&toDate=01-01-2018&userType=Industry&userId='+val3+'&catType='+val2+'&topic='+val).map((response: Response) => response.json());
    }
    

    private jwt() {
        // create authorization header with jwt token
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}