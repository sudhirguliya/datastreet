import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IndustryService,CompanyService} from '../_services/index';
import { Http } from '@angular/http';
import { Industry } from '../_models/index';

@Component({
  templateUrl: 'mydashboard.component.html'
})
export class MydashboardComponent implements OnInit {
  
  
  constructor(private route: ActivatedRoute,private router: Router, private http: Http, private IndustryService: IndustryService,private CompanyService: CompanyService) {
       // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  public company_data;
  public url:any='';
  public yes:any=false
  public yes_d:any=false
  public url_type='CIN';
  public url_t='Compnay';
  public types:any=''
  public class:any=''
  public date:any=''
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
 ngOnInit() {
      let returnUrl1 = this.route.snapshot.queryParams['id'] || '1';
      let returnUrl2 = this.route.snapshot.queryParams['did'] || '2';
      if(returnUrl2==2)
      {
        console.log('ww');
        this.url=this.route.snapshot.queryParams['id'];
        this.url_type='CIN';
        this.url_t = 'Compnay';
        this.CompanyService.getCompany(this.url).subscribe(data => { this.company_data = data.company.roc.COMPANY_NAME;this.types=data.industry_type;this.class=data.company.roc.COMPANY_CLASS;this.location=data.company.roc.REGISTERED_STATE
      
          },error => {},() =>console.log('doness'));
        this.yes=true;
        this.yes_d=false;
      }
      if(returnUrl1==1)
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
      this.lineChartLabels=[];
      if(value=='news')
      {
        this.IndustryService.getNewsTopic().subscribe(data => { this.news_topic=data;});
      }
      else{
        this.news_topic=[];
      }
      this.heading=this.category;
      this.IndustryService.get_news_details_sub('all',this.category,this.url,this.url_type).subscribe(
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
  private dataselect_sub(records)
  {
      this.lineChartData = [
        {data: [], label: 'News'}
      ];
      this.lineChartLabels=[];
      this.IndustryService.get_news_details_sub(records.value,this.category,this.url,this.url_type).subscribe(
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
      this.lineChartLabels=[];
      this.IndustryService.getNewsTopic().subscribe(data => { this.news_topic=data },error => {},() =>console.log('done'));
      this.IndustryService.get_news_details_sub('all',this.category,this.url,this.url_type).subscribe(
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
}
