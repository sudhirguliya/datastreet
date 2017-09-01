import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/index';

import { contentHeaders } from '../../common/headers';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    public error:any='';
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        ) { }

  login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                  //this.alertService.success('login successful', true);
                 console.log(data.response);
                 if(data.response.status==401)
                 {
                    this.error=data.response.message;
                    this.loading = false;
                 }else{
                      localStorage.setItem('currentUser', JSON.stringify(data.response.data))
                      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'industry';
                      //console.log(this.returnUrl);
                      this.router.navigate(['/my-dashboard']);
                 }
                 
                },
                error => {
                    //this.alertService.error(error);
                    console.log(error);
                    
                });
    }
    ngOnInit() {
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'industry';

      if (localStorage.getItem('currentUser') && localStorage.getItem('currentUser') != 'undefined') {
          this.router.navigate(['/industry']);
        }

        
    }
}
