import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IndustryService} from '../_services/index';
import { Http } from '@angular/http';
import { Industry } from '../_models/index';

@Component({
  templateUrl: './industry.component.html'
})

export class IndustryComponent implements OnInit {

  // constructor( ) { }
  constructor(private router: Router, private http: Http, private IndustryService: IndustryService) {
       // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  public industry_content: string ="loading";
  public graph_count:any=[];
  public snapshot:any='';
  public ok:any=true;
  public notok:any=false;
  public industry_name:any='';
  public subscategory:any='';
  public topplayers:any='';
  public lineChartData: Array<any>=[];
  public lineChartLabels: Array<any>=[];
 
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
      let search_industry = JSON.parse(localStorage.getItem('search_industry'));
      this.industry_name=search_industry[0].id;
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
        this.IndustryService.getNewsTopic().subscribe(data => { this.news_topic=data;this.subscategory='all'});
        this.heading=this.category;
        this.IndustryService.get_news_details_sub('all',this.category,this.industry_name,'Industry').subscribe(
        data => { this.lineChartData = [ {data: data.response.countList, label: 'NEWS'} ]; 
                  for (let i=0; i<data.response.monthList.length; i++) {
                      this.lineChartLabels.push(data.response.monthList[i]);
                  }
                  this.newslegalsocial=data.response.full_data
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
      //this.lineChartLabels=[];
      this.IndustryService.get_news_details_sub(records.value,this.category,this.industry_name,'Industry').subscribe(
      data => { this.lineChartData = [ {data: data.response.countList, label: 'NEWS'} ]; 
                for (let i=0; i<data.response.monthList.length; i++) {
                    this.lineChartLabels.push(data.response.monthList[i]);
                }
                this.newslegalsocial=data.response.full_data
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
      //this.lineChartLabels=[];
  		this.IndustryService.getNewsTopic().subscribe(data => { this.news_topic=data;this.subscategory='all' },error => {},() =>console.log('done'));
      this.IndustryService.get_news_details_sub('all',this.category,this.industry_name,'Industry').subscribe(
      data => { this.lineChartData = [ {data: data.response.countList, label: 'NEWS'} ]; 
                for (let i=0; i<data.response.monthList.length; i++) {
                    this.lineChartLabels.push(data.response.monthList[i]);
                }
                this.newslegalsocial=data.response.full_data
                },error => {},() =>console.log('data'));

      
        this.IndustryService.getAll('IT')
            .subscribe(data => { 
            		console.log(data);
                    this.industry_content = data.Description;
                    this.snapshot=data.Snapshot
                    //console.log(this.plans);
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
                this.IndustryService.getTopPlayers()
            		.subscribe(data => { 
                    this.topplayers = data
                    //console.log(data);
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
                () =>console.log('hello'))
    }
    public director_function(val)
    {
        let array_of = [{"type":"company","id":val}]
         localStorage.setItem('search_compnay', JSON.stringify(array_of))
         this.router.navigate(['/company']);
    }
    public iframe_show(val)
    {
      alert(val)
    }
}
