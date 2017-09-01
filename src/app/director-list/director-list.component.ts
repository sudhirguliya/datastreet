import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DirectorService} from '../_services/index';
import { Http } from '@angular/http';
import { Director } from '../_models/index';

@Component({
  templateUrl: 'director-list.component.html'
})
export class DirectorListComponent implements OnInit {

constructor(private router: Router, private http: Http, private DirectorService: DirectorService) {}

public cin:any='U45200MP2009PTC021742';
public directorList:any=[];
    ngOnInit() {
       let search_company = JSON.parse(localStorage.getItem('search_compnay'));
        this.cin=search_company[0].id;
        this.DirectorService.getDirectorList(this.cin)
            .subscribe(data => { 

                   if(data.response.data.company.signatories) {
                     this.directorList=data.response.data.company;
                   }
                
               
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
    public director_function(val)
    {
        let array_of = [{"type":"company","id":val}]
         localStorage.setItem('search_director', JSON.stringify(array_of))
         this.router.navigate(['/director']);
    }
   
}
