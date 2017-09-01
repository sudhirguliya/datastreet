import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/index';

import { contentHeaders } from '../../common/headers';


@Component({
  selector: 'app-logout',
  //templateUrl: './logout.component.html',
  //styleUrls: ['./logout.component.css']
  template :''
})
export class LogoutComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,) { }

  ngOnInit() {
    this.authenticationService.logout();
     this.router.navigate(['/login']);
        
  }

}
