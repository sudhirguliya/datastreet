import { Injectable } from '@angular/core';
import { contentHeaders } from '../../common/headers';
import { Router , ActivatedRoute } from '@angular/router';
import { credentials } from '../_guards/crediential';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    returnUrl: string;
    constructor(private http: Http, private router: Router,  private route: ActivatedRoute,) { }

    login(email: string, password: string) {
        return this.http.post(credentials.host + '/1.0/login/', JSON.stringify({ email: email, password: password }), { headers: contentHeaders })

            .map((response: Response) => response.json());
    }
    following(id:string,val:string) {
        return this.http.get('http://127.0.0.1:5002/1.0/following/'+id+'/'+val+'/').map((response: Response) => response.json())
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('reference_company');
        localStorage.removeItem('search_compnay');
        localStorage.removeItem('search_director');
        localStorage.removeItem('search_industry');
        //this.alertService.success('logout successful, happy to see you', true);
        this.router.navigate(['/login']);
    }
    private roles = [
        { value: 'admin', display: 'Administrator' },
        { value: 'guest', display: 'Guest' }
    ];
    private user = {
        role: 'guest'
    };
    getCurrentUser() {
        return Observable.create((observer) => {
        observer.next(Object.assign({}, this.user));
        });
    }
    getRoles() {
        return this.roles;
    }
    
    setRole(role:string){
        this.user.role = role;
    }
    
    isAdmin() {
        return this.user.role === 'admin';
    }
  

    ngOnInit() {
      
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
      //console.log(this.returnUrl); 
    }
}