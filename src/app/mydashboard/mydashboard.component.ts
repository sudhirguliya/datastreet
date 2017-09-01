import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IndustryService,CompanyService} from '../_services/index';
import { Http } from '@angular/http';
import { Industry } from '../_models/index';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import * as moment from 'moment'
@Component({
  templateUrl: 'mydashboard.component.html'
})
export class MydashboardComponent implements OnInit {
  
  date: DateModel;
  options: DatePickerOptions;
  public toDateObj:any='';
  public fromDateObj:any='';
  public fromDate:string='01-01-2017';
  public toDate:string  ='01-01-2018';

  
  public company_data;
  public url:any='';
  public subscategory:any='';
  public yes:any=false
  public ok:any=true;
  public notok:any=false;
  public yes_d:any=false
  public url_type='CIN';
  public url_t='Compnay';
  public types:any=''
  public class:any=''
  public location:any=''
  public industry_content: string ="loading";
  public graph_count:any=[];
  public snapshot:any='';
  public topplayers:any='';
  public lineChartData: Array<any>=[];
  public lineChartLabels: Array<any>=[];
  public doughnutChartLabels: string[] = ['No Data'];
  public doughnutChartData: number[] = [2];
  public doughnutChartType: string = 'doughnut';
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public category:any='news';
  public heading:any='News'
  public search:string = '';
  public news_topic:any='';
  public newslegalsocial:any='';
  public graph:any=''
  public  selectedValue = null;
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(178,159,177,0.2)',
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

  constructor(private route: ActivatedRoute,private router: Router, private http: Http, private IndustryService: IndustryService,private CompanyService: CompanyService) {
       // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }



 ngOnInit() {
      //Date format
     
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


      let returnUrl1 = this.route.snapshot.queryParams['id'] || '1';
      let returnUrl2 = this.route.snapshot.queryParams['did'] || '2';
      if(returnUrl2==2 && returnUrl1==1)
      {
        this.url_type='CIN';
        this.url_t = 'Compnay';
        this.url='U45200MP2009PTC021742';
        this.CompanyService.getCompany(this.url).subscribe(data => { this.company_data = data.company.roc.COMPANY_NAME;this.types=data.industry_type;this.class=data.company.roc.COMPANY_CLASS;this.location=data.company.roc.REGISTERED_STATE
      
          },error => {},() =>console.log('doness'));
        this.yes=true;
        this.yes_d=false;
        let array_of = [{"type":"company","id":this.url}]
        let array_ofs = [{"type":"company","id":'IT'}]
        localStorage.setItem('search_compnay', JSON.stringify(array_of))
        localStorage.setItem('search_industry', JSON.stringify(array_ofs))
      }
      else if(returnUrl2==2 && returnUrl1!=1)
      {
        console.log('ww');
        this.url=this.route.snapshot.queryParams['id'];
        this.url_type='CIN';
        this.url_t = 'Compnay';
        this.CompanyService.getCompany(this.url).subscribe(data => { this.company_data = data.company.roc.COMPANY_NAME;this.types=data.industry_type;this.class=data.company.roc.COMPANY_CLASS;this.location=data.company.roc.REGISTERED_STATE
      
          },error => {},() =>console.log('doness'));
        this.yes=true;
        this.yes_d=false;
        let array_of = [{"type":"company","id":this.url}]
        localStorage.setItem('search_compnay', JSON.stringify(array_of))
      }
      else if(returnUrl1==1 && returnUrl2!=2)
      {
        console.log('wws');
        this.url=this.route.snapshot.queryParams['did'];
        this.url_type='DIN';
        this.url_t='Director';
        this.yes=false;
        this.yes_d=true;
        this.CompanyService.getDirector(this.url).subscribe(data => { this.company_data = data.director_name;this.location=data.description;
      
          },error => {},() =>console.log('doness'));
        
      }
      this.industryDetails();

      
    }



  private dataselect(value)
  {
      this.lineChartData = [
        {data: [], label: 'IT'}
      ];
      
      for (let j=this.lineChartLabels.length-1; j>=0; j--) 
        {
              
              this.lineChartLabels.splice(j,1);
              this.lineChartData[0].data.splice(j,1);
              
        }
      if(value=='news')
      {
        this.ok=true;
         this.notok=false;
         let from =this.fromDate;
          let to = this.toDate;
        this.IndustryService.getNewsTopic().subscribe(data => { this.news_topic=data;this.subscategory='all'});
        this.heading=this.category;
        this.heading=this.category;
      this.IndustryService.get_news_details_sub_1('all',this.category,this.url,this.url_type,from,to).subscribe(
      data => { this.lineChartData = [ {data: data.response.countList, label: 'NEWS'} ]; 
                for (let i=0; i<data.response.monthList.length; i++) {
                    this.lineChartLabels[i]=(data.response.monthList[i]);
                }
                this.newslegalsocial=data.response.full_data
                this.doughnutChartLabels=[];
                let check=0
                for (let j=data.response.monthList.length-1; j>=0; j--) 
                      {
                        this.doughnutChartData.splice(j,1);
                        
                      }
                let create_object=[];
                for (let i=0; i<data.response.monthList.length; i++) {
                             
                                  this.doughnutChartLabels[check]=data.response.monthList[i];
                                  this.doughnutChartData[check]=data.response.countList[i];
                                  check++;
    
                                
                  }
                 // this.dropdownList=create_object;
                 // this.dropdownListOpt=create_object
                 // this.selectedItems=create_object;
                  
                 if(check==0)
                  {
                      
                      this.doughnutChartLabels[0]='no data';
                      this.doughnutChartData[0]=0;
                  }
                }) 
      }
      else if(value=="legal"){
        this.ok=false;
         this.notok=true;
        this.heading='Legal'
        this.IndustryService.getLegalTopic().subscribe(data => { this.news_topic=data;
        this.subscategory=data[0]
        let sr={'value':data[0]}
        this.dataselect_sub(sr);
        });
      }
      
  }
  private dataselect_sub(records)
  {
      this.lineChartData = [
        {data: [], label: 'IT'}
      ];
      
      for (let j=this.lineChartLabels.length-1; j>=0; j--) 
        {
              
              this.lineChartLabels.splice(j,1);
              this.lineChartData[0].data.splice(j,1);
              
        }
      let from =this.fromDate;
      let to = this.toDate;
      this.IndustryService.get_news_details_sub_1(records.value,this.category,this.url,this.url_type,from,to).subscribe(
      data => { this.lineChartData = [ {data: data.response.countList, label: 'NEWS'} ]; 
                for (let i=0; i<data.response.monthList.length; i++) {
                    this.lineChartLabels[i]=(data.response.monthList[i]);
                    
                }
                this.newslegalsocial=data.response.full_data
                this.doughnutChartLabels=[];
                let check=0
                for (let j=data.response.monthList.length-1; j>=0; j--) 
                      {
                        this.doughnutChartData.splice(j,1);
                        
                      }
                let create_object=[];
                for (let i=0; i<data.response.monthList.length; i++) {
                             
                                  this.doughnutChartLabels[check]=data.response.monthList[i];
                                  this.doughnutChartData[check]=data.response.countList[i];
                                  check++;
    
                                
                  }
                 // this.dropdownList=create_object;
                 // this.dropdownListOpt=create_object
                 // this.selectedItems=create_object;
                  
                 if(check==0)
                  {
                      
                      this.doughnutChartLabels[0]='no data';
                      this.doughnutChartData[0]=0;
                  }

                })
  }
  private industryDetails() {
      this.lineChartData = [
        {data: [], label: 'IT'}
      ];
      
      for (let j=this.lineChartLabels.length-1; j>=0; j--) 
        {
              
              this.lineChartLabels.splice(j,1);
              this.lineChartData[0].data.splice(j,1);
              
        }
      this.lineChartLabels=[];
      this.IndustryService.getNewsTopic().subscribe(data => { this.news_topic=data },error => {},() =>console.log('done'));
      let from =this.fromDate;
      let to = this.toDate;
      this.IndustryService.get_news_details_sub_1('all',this.category,this.url,this.url_type,from,to).subscribe(
      data => { 

                this.lineChartData = [ {data: data.response.countList, label: 'NEWS'} ]; 
                for (let i=0; i<data.response.monthList.length; i++) {
                    this.lineChartLabels[i]=(data.response.monthList[i]);
                }
                this.newslegalsocial=data.response.full_data

                this.doughnutChartLabels=[];
                let check=0
                for (let j=data.response.monthList.length-1; j>=0; j--) 
                      {
                        this.doughnutChartData.splice(j,1);
                        
                      }
                let create_object=[];
                for (let i=0; i<data.response.monthList.length; i++) {
                             
                                  this.doughnutChartLabels[check]=data.response.monthList[i];
                                  this.doughnutChartData[check]=data.response.countList[i];
                                  check++;
    
                                
                  }
                 // this.dropdownList=create_object;
                 // this.dropdownListOpt=create_object
                 // this.selectedItems=create_object;
                  
                 if(check==0)
                  {
                      
                      this.doughnutChartLabels[0]='no data';
                      this.doughnutChartData[0]=0;
                  }

                },error => {},() =>console.log('data'));
    }


    private newsFilterFromDate(v){

    this.fromDate =v.formatted;
    let sr={'value':this.subscategory}
    this.dataselect_sub(sr);
     
  }

  private newsFilterToDate(v1){
     this.toDate =v1.formatted;
     let sr={'value':this.subscategory}
      this.dataselect_sub(sr);
  
  }
     
}
