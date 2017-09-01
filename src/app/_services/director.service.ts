import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import {credentials} from '../_guards/crediential';
import  * as fs  from 'fs';
import { Director } from '../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class DirectorService {
    constructor(private http: Http) { }

    getDirectorInfo(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/director_info?din='+val).map((response: Response) => response.json())
    }
    
    get_company(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/company_by_director?din='+val).map((response: Response) => response.json())
    }

    getNewsTopic(){
        return this.http.get('http://127.0.0.1:5002/1.0/news_topic/').map((response: Response) => response.json())
    }
    get_news_details(topic:string,catType:string,userId:string,fromDate:string,toDate:string)
    {
        if(topic=='all')
        {
            topic='';
        }
        return this.http.get('http://127.0.0.1:5002/1.0/get_news?fromDate='+fromDate+'&toDate='+toDate+'&userType=DIN&userId='+userId+'&catType='+catType+'&topic='+topic).map((response: Response) => response.json());
    }

    


    get_director_equity(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/director_equity?din='+val).map((response: Response) => response.json())
    }
    get_director_company(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/director_equity?din='+val).map((response: Response) => response.json())
    }

    get_blance_sheet(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/blance_sheet?company='+val).map((response: Response) => response.json())
    }
    get_portfolio(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/get_portfolio?company='+val).map((response: Response) => response.json())
    }

    getDirectorList(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/director_list?cin='+val).map((response: Response) => response.json())
    }

    documentList(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/document_list?cin='+val).map((response: Response) => response.json())
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