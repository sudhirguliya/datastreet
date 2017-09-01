import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TrademarkService} from '../_services/index';
import { Http } from '@angular/http';
import { Industry } from '../_models/index';

@Component({
  templateUrl: './trademark.component.html'
})

export class TrademarkComponent implements OnInit {

  // constructor( ) { }
  constructor(private router: Router, private http: Http, private TrademarkService: TrademarkService) {
    }
  public trademark:any=[];
  public cin='U45200MP2009PTC021742';
 ngOnInit() {
 		this.TrademarkService.getAll(this.cin).subscribe(
      	data => { 
                	//console.log(data)
                	this.trademark=data.company.trademark
                }) 
     
    }

  
}
