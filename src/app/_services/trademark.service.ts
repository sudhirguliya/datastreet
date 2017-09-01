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
export class TrademarkService {

    constructor(private http: Http) { }
    getAll(val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/trademark/'+val+'/').map((response: Response) => response.json())
    }
    

}