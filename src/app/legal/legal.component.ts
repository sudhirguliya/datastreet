import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LegalService ,IndustryService} from '../_services/index';
import { Http } from '@angular/http';
import { Industry } from '../_models/index';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import * as moment from 'moment'

@Component({
  templateUrl: './legal.component.html'
})

export class LegalComponent implements OnInit {

  date: DateModel;
  options: DatePickerOptions;
  public toDateObj:any='';
  public fromDateObj:any='';
  public fromDate:string='01-01-2017';
  public toDate:string  ='01-01-2018';


  // constructor( ) { }
  constructor(private IndustryService: IndustryService,private router: Router, private http: Http, private LegalService: LegalService) {
    }
  public legal:any=[];
  public category:any='legal';
  public news_topic:any='';
  public subscategory:any='';
  public newslegalsocial:any='';
  public cin='U45200MP2009PTC021742';
  public lineChartData: Array<any> = [
    {data: [65], label: 'Series A'},
    ];
    public lineChartData1: Array<any> = [
      {data: [1,2,3], label: 'Series A'},
    ];
    public lineChartLabels: Array<any> = ['January'];
    public lineChartLabels1: Array<any> = ['April','May','June'];
    public lineChartOptions: any = {
      animation: false,
      responsive: true
    };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
 ngOnInit() {

    this.options = new DatePickerOptions({
     format: 'DD-MM-YYYY'
     });
      let dateModel:DateModel = new DateModel();
      let momentObj = moment('01-01-2017', "MM-DD-YYYY");
      dateModel.momentObj = momentObj;
      dateModel.formatted = momentObj.format("DD-MM-YYYY" );
      this.fromDateObj = dateModel;

      let dateModel1:DateModel = new DateModel();
      let momenObj1 = moment('01-01-2018', "MM-DD-YYYY");
      dateModel1.formatted = momenObj1.format("DD-MM-YYYY" );
      this.toDateObj = dateModel1;

    let search_company = JSON.parse(localStorage.getItem('search_compnay'));
      this.cin=search_company[0].id; 
 		this.LegalService.getAll(this.cin).subscribe(
      	data => { 
                	//console.log(data)
                	this.legal=data.company.legal
                }) 
      this.IndustryService.getLegalTopic().subscribe(data => { this.news_topic=data;this.subscategory=data[0] 
        let sr={'value':data[0]}
        this.dataselect_sub(sr)
      },error => {},() =>console.log('done'));
     
    }
    public legal_data(i:number)
    {
      this.LegalService.getAll(this.cin).subscribe(
        data => { 
                  console.log(data.company.legal[i])
                }) 
    }

  private dataselect_sub(records)
  {
      this.lineChartData1 = [
        {data: [], label: 'IT'}
      ];
      
      for (let j=this.lineChartLabels1.length-1; j>=0; j--) 
        {
              
              this.lineChartLabels1.splice(j,1);
              this.lineChartData1[0].data.splice(j,1);
              
        }
       let from =this.fromDate;
      let to = this.toDate;
      this.IndustryService.get_news_details_sub_1(records.value,this.category,this.cin,'CIN',from,to).subscribe(
      data => { this.lineChartData1 = [ {data: data.response.countList, label: this.category} ]; 
                for (let i=0; i<data.response.monthList.length; i++) {
                    this.lineChartLabels1.push(data.response.monthList[i]);
                }
                this.newslegalsocial=data.response.full_data;
                console.log(this.lineChartLabels1);
                console.log(this.lineChartData1);
                })
  }
   private newsFilterFromDate(v){

    this.fromDate =v.formatted;
    alert(new Date(this.toDate));
    if(new Date(this.fromDate) < new Date(this.toDate))
    {
      alert("hii");
    }
    let sr={'value':this.subscategory}
    this.dataselect_sub(sr);
     
  }

  private newsFilterToDate(v1){
     this.toDate =v1.formatted;
     if(new Date(this.fromDate) < new Date(this.toDate))
      {
        alert("hii");
      }
     let sr={'value':this.subscategory}
      this.dataselect_sub(sr);
  
  }
  
}
