import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import {credentials} from '../_guards/crediential';
import  * as fs  from 'fs';
import { Fratio } from '../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class FinancialRatioService {
    constructor(private http: Http) { }

    

    get_ratio_type(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/ratio_type?cin='+val).map((response: Response) => response.json())
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