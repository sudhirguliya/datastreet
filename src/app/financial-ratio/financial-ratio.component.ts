import { Component, OnInit,Pipe } from '@angular/core';
import { Router } from '@angular/router';
import {FinancialRatioService} from '../_services/index';
import { Http } from '@angular/http';
import { Director } from '../_models/index';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import * as moment from 'moment'

@Component({
  templateUrl: 'financial-ratio.component.html'
})

export class FinancialRatioComponent implements OnInit {

   constructor(private router: Router, private http: Http, private FinancialRatioService:FinancialRatioService) {}

  public ratioTypeArr:any=[];
  public ratioType:string='';

  public ratioArr:any=[];
  public ratio:string=''
  public yearArr:any=['2015','2016'];
  public year='';
  public companyArr:any=[];
  public company:string='';
  public wtPramArr:any=[];
  public wtPram:any='';
  public industryType:any='';
  public cin:string = 'U45200MP2009PTC021742';

  public lastYearLevel:any   ='Ratio_value_2015';
  public currentYearLevel:any='Ratio_value_2016';
  public lastYear:any   ='';
  public currentYear:any='';
  public rtListArr:Array<any> = [];






  //Linechart
  public category:any='news';
  public topic:any='all';
  public heading:any='News'
  public search:string = '';
  public news_topic:any='';
  public newslegalsocial:any='';
  public graph:any=''
  public topplayers:any='';
  public selectedValue = null;

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];




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
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

   
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartLabels:Array<any> = ['2015','2016'];
  public barChartData:Array<any> = [
    {data: [65, 59], label: 'Unyscape'}
  ];

  ngOnInit() {
   this.funRatiotype();
  }


    private funRatiotype() 
    {
    
      let prevYear = ((new Date()).getFullYear())-2;
      let currYear = ((new Date()).getFullYear()-1);

      this.lineChartData = [
        {data: [], label: ''}
      ];
     
    
      this.lineChartLabels=[prevYear,currYear];
     
      this.FinancialRatioService.get_ratio_type(this.cin).subscribe(data => {

     if(data.response.industry_type){
     this.industryType = data.response.industry_type;
     }
      let list=0;
      for (let i=0; i<data.response.ratiotype.financial_ratio.length; i++) 
      {
         this.ratioTypeArr[i]=data.response.ratiotype.financial_ratio[i]['Ratio_category'];
         this.ratioType=this.ratioTypeArr[0];

         if(this.ratioType==data.response.ratiotype.financial_ratio[i]['Ratio_category']) 
         { 
         this.ratioArr.push(data.response.ratiotype.financial_ratio[i]['Ratio_sub_category']);
         ;
         this.ratio= this.ratioArr[0];

         this.wtPramArr.push(data.response.ratiotype.financial_ratio[i]['Ratio_forumula']);
         ;
          this.wtPram=this.wtPramArr[0];
          this.lastYear= data.response.ratiotype.financial_ratio[i][this.lastYearLevel];
          this.currentYear= data.response.ratiotype.financial_ratio[i][this.currentYearLevel];

          this.rtListArr[list]={'Ratio_category':data.response.ratiotype.financial_ratio[list]['Ratio_sub_category'],'Ratio_sub_category':data.response.ratiotype.financial_ratio[list]['Ratio_sub_category'],'Ratio_value_2016':data.response.ratiotype.financial_ratio[list]['Ratio_value_2016'],'Ratio_value_2015':data.response.ratiotype.financial_ratio[list]['Ratio_value_2015'],'Company_name':data.response.ratiotype.financial_ratio[list]['Company_name']};

          list++;

         }
         
         if(i==0) {
          this.companyArr.push(data.response.ratiotype.financial_ratio[i]['Company_name']);
         }

         this.lineChartData = [ {data: [this.lastYear, this.currentYear], label: this.companyArr[0]}];

          this.barChartData = [ {data: [this.lastYear, this.currentYear], label: this.companyArr[0]}];
	        this.barChartLabels=[prevYear,currYear];

        }
     
     }); 



     console.log( this.rtListArr);    
    }

    private filterRatio(v) 
    {
      let prevYear = ((new Date()).getFullYear())-2;
      let currYear = ((new Date()).getFullYear()-1);


      this.lineChartData = [
        {data: [], label: ''}
      ];
      this.lineChartLabels=[];
      
      this.barChartData = [
        {data: [], label: ''}
      ];
      this.barChartLabels=[];

      this.FinancialRatioService.get_ratio_type(this.cin).subscribe(data => {

	     if(data.response.industry_type){
	     this.industryType = data.response.industry_type;
	     }
	     this.ratioArr=[];
	     this.companyArr=[];
	     this.wtPramArr=[];

	     if(v =='ratioType') {
          //alert( this.ratioType);
	     }
	     else if(v=='ratio') {

	     }
	     else if(v=='year' && this.year!='') {
	       this.lineChartLabels=[this.year];
	     }
	     else if(v=='company') {
	     
	     }
	     else if(v=='wtparam') {
	     
	     }
      let list=0;
      for (let i=0; i<data.response.ratiotype.financial_ratio.length; i++) 
      {
         this.ratioTypeArr[i]=data.response.ratiotype.financial_ratio[i]['Ratio_category'];
         if( this.ratioType=='') { this.ratioType=this.ratioTypeArr[0];}
         
         if(i==0) 
         {
          this.companyArr.push(data.response.ratiotype.financial_ratio[i]['Company_name']);
         }

         if(this.ratioType==data.response.ratiotype.financial_ratio[i]['Ratio_category']) 
         { 
         this.ratioArr.push(data.response.ratiotype.financial_ratio[i]['Ratio_sub_category']);
         ;
         this.ratio= this.ratioArr[0];

         this.wtPramArr.push(data.response.ratiotype.financial_ratio[i]['Ratio_forumula']);
         ;
          this.wtPram=this.wtPramArr[0];
          this.lastYear= data.response.ratiotype.financial_ratio[i][this.lastYearLevel];
          this.currentYear= data.response.ratiotype.financial_ratio[i][this.currentYearLevel];
          
          // for list view---------------->
          this.rtListArr[list]={'Ratio_category':data.response.ratiotype.financial_ratio[i]['Ratio_category'],'Ratio_sub_category':data.response.ratiotype.financial_ratio[i]['Ratio_sub_category'],'Ratio_value_2016':data.response.ratiotype.financial_ratio[i]['Ratio_value_2016'],'Ratio_value_2015':data.response.ratiotype.financial_ratio[i]['Ratio_value_2015'],'Company_name':data.response.ratiotype.financial_ratio[i]['Company_name']};
          list++;

         }

         
	        if(this.year=='2015') {
		        this.lineChartData = [ {data: [this.lastYear], label: this.companyArr[0]}];
		        this.barChartData = [ {data: [this.lastYear], label: this.companyArr[0]}];
		        this.barChartLabels=[prevYear];
		        this.lineChartLabels=[prevYear];
		      }
		      else if(this.year=='2016') {
		        this.lineChartData  = [ {data: [this.currentYear], label: this.companyArr[0]}];
		        this.barChartData   = [ {data: [this.currentYear], label: this.companyArr[0]}];
		        this.barChartLabels =[currYear];
		        this.lineChartLabels=[currYear];
		      }
		      else {
	         this.lineChartData = [ {data: [this.lastYear, this.currentYear], label: this.companyArr[0]}];
	         this.barChartData = [ {data: [this.lastYear, this.currentYear], label: this.companyArr[0]}];
	         this.barChartLabels=[prevYear,currYear];
	         this.lineChartLabels=[prevYear,currYear];
	         
	        }
	        

       }
       console.log(this.barChartLabels);
       console.log(this.barChartData);
     
     });      

    }



}
