import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {CompanyService} from '../_services/index';
import { CompleterService, CompleterData } from 'ng2-completer';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './industry-layout.component.html'
})
export class IndustryLayoutComponent implements OnInit {
  items: Observable<Array<string>>;
  term = new FormControl();
  public text_search:any='';
  public select_type:any='company'
  public somePlaceholder:any='Please type company name';
  public select_text:any='';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  constructor(private router: Router,private CompanyService: CompanyService) {}


  selectedItem: any = '';
  inputChanged: any = '';
  wikiItems: any[] = [];
  onSelect(item: any) {
    if(this.select_type=='company')
    {
       this.CompanyService.search_name(item,this.select_type).subscribe(e => {
       let array_of = [{"type":"company","id":e.number}]
          localStorage.setItem('search_compnay', JSON.stringify(array_of))
          let array_ofs = [{"type":"industry","id":e.industry_type}]
          localStorage.setItem('search_industry', JSON.stringify(array_ofs))
          this.router.navigate(['/company']);
        }, error => console.log(error));
    }
    if(this.select_type=='industry')
    {
       this.CompanyService.search_name(item,this.select_type).subscribe(e => {
        let array_of = [{"type":"industry","id":e.name}]
         localStorage.setItem('search_industry', JSON.stringify(array_of))
         this.router.navigate(['/industry']);
        }, error => console.log(error));
    }
    if(this.select_type=='director')
    {
       this.CompanyService.search_name(item,this.select_type).subscribe(e => {
       console.log(e);
        let array_of = [{"type":"company","id":e.number}]
         localStorage.setItem('search_director', JSON.stringify(array_of))
         this.router.navigate(['/director']);
        }, error => console.log(error));
    }
  }
 
  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }
 
  search (term: string) {
    if(term!='')
    {

      this.text_search=term;
      this.CompanyService.search(term.toUpperCase(),this.select_type).subscribe(e => {
      for(let i=0;i<e.length;i++)
      {
          this.wikiItems[i] = e[i].name
      }
      console.log(this.wikiItems);
      }, error => console.log(error));
    }
    else{
        this.wikiItems=[];
    }
  }



  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  public select_record(val)
  {
    if(val=='company')
    {
       this.somePlaceholder='Please type company name';
       this.select_text=''
    }
    if(val=='industry')
    {
       this.somePlaceholder='Please type industry name';
       this.select_text=''
    }
    if(val=='director')
    {
       this.somePlaceholder='Please type Diretor Name';
       this.select_text=''
    }

  }

  ngOnInit(){
    
  }
}
