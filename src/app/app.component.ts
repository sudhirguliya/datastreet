import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})

export class AppComponent { 
	isMenuCollapsed: boolean = false;

  constructor() { }

 }
