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
export class CompanyService {

    constructor(private http: Http) { }

    

}