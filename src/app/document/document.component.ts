import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DirectorService} from '../_services/index';
import { Http } from '@angular/http';
import { Director } from '../_models/index';

@Component({
  templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnInit {

constructor(private router: Router, private http: Http, private DirectorService: DirectorService) {}

public cin:any='U45200MP2009PTC021742';
public documentList:any=[];
    ngOnInit() {
       
        this.DirectorService.documentList(this.cin)
            .subscribe(data => { 
            console.log(data.response.data);
              this.documentList=data.response.data;
                },
                error => {
                  console.log(error);
                    if (error.status === 401)
                    {                   
                        console.log('Internal server error, No auth token.', true);
                    } 
                    if (error.status === 500)
                    {                   
                       console.log('Internal server error, No auth token.', true);
                    } 
                },
                () =>console.log('done'));

               

    }

   
}
