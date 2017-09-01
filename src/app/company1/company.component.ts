import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CompanyService} from '../_services/index';
import { Http } from '@angular/http';
import { Industry } from '../_models/index';

@Component({
  templateUrl: 'company.component.html'
})
export class CompanyComponent implements OnInit {

  constructor(private router: Router, private http: Http, private CompanyService: CompanyService) {
       // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    public director:any=0;
    public cin:any=0;
    public agency:any='one';
    public atType:any='all';
    public att:any='';
    public rating:any=[];
    public password:any='';
    public charges:any=0;
    public cases:any=0;
    public company_data:any='Loading...';
    public type:any='';
    public date:any='';
    public company_category:any=''
    public location:any='';
    public company_name:any=''
    public class:any='';
    public Authorized_Capital_Rs:any=''
    public year:any='2016';
    public charge_table:any=[];
    public diretcor_data:any=[];
    public business_activity:any=[];
    public doughnutChartLabels: string[] = ['No Data'];
    public doughnutChartData: number[] = [0];
    public doughnutChartType: string = 'doughnut';
    public polarAreaChartLabels: string[] = ['a','b'];
    public polarAreaChartData: number[] = [2,3];
    public polarAreaLegend: boolean = true;
    public polarAreaChartType: string = 'polarArea';
    public dropdownList = [];
    public dropdownListOpt = [];
    public selectedItems = [];
    public dropdownSettings = {};
    public subsdiary:any=[];
    public lineChartData: Array<any> = [
    {data: [65], label: 'Series A'},
  ];
  public lineChartLabels: Array<any> = ['January'];
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
      let search_company = JSON.parse(localStorage.getItem('search_compnay'));
      this.cin=search_company[0].id; 
      this.companyData();
      this.agency_function();
      
    }
    public pieChartLabels: string[] = ['a','b'];
    public pieChartData: number[] = [1,2];
    public pieChartType: string = 'pie';
    public chartClicked(e: any): void {
      
    }
    public chartHovered(e: any): void {
     
    }
    private companyData()
    {
      
      this.CompanyService.getAll(this.cin).subscribe(data => { this.director = data.director;this.charges=data.charges; },error => {},() =>console.log('done'));

      this.CompanyService.getCompany(this.cin).subscribe(data => { this.company_data = data.company.roc.COMPANY_NAME;this.type=data.industry_type;this.class=data.company.roc.COMPANY_CLASS;this.location=data.company.roc.REGISTERED_STATE
      this.subsidiary(data.company.subsidiary);
      
      },error => {},() =>console.log('doness'));



      this.CompanyService.getBusinesss(this.year,this.cin).subscribe(data => { this.business_activity = data.business_activity; 
      
      
      this.doughnutChartLabels=[];
      let check=0
      for (let j=data.business_activity.length-1; j>=0; j--) 
            {
              this.doughnutChartData.splice(j,1);
              
            }
      let create_object=[];
      for (let i=0; i<data.business_activity.length; i++) {
                    if(data.business_activity[i].year==this.year)
                      {
                        this.doughnutChartLabels[check]=data.business_activity[i].name;
                        this.doughnutChartData[check]=data.business_activity[i].turnover;
                        //create_object[check]={"id":check,"itemName":data.business_activity[i].name}
                        check++;
                      }
                      
        }
       // this.dropdownList=create_object;
       // this.dropdownListOpt=create_object
       // this.selectedItems=create_object;
        
       if(check==0)
        {
            
            this.doughnutChartLabels[0]='no data';
            this.doughnutChartData[0]=0;
        }
       },error => {},() =>console.log('donessss'));



       this.CompanyService.getEquity(this.cin).subscribe(data => {
        this.company_name=data.company.roc.COMPANY_NAME;
        this.company_category=data.company.roc.COMPANY_CATEGORY;
        this.Authorized_Capital_Rs=data.company.roc.Authorized_Capital_Rs;
        let propValue:any=0;
        for (let j=data.board_member.length-1; j>=0; j--) 
            {
                for(var propName in data.board_member[j].share) {     
                  if(data.board_member[j].share.hasOwnProperty(propName)) {
                     propValue = parseInt(propValue) + parseInt(data.board_member[j].share[propName]);
                    }
                }
            }
          this.pieChartLabels=[];
          let director_percentace = (propValue*100)/data.company.roc.Authorized_Capital_Rs;
          let non_director = 100-director_percentace;
          let leble=['Director '+director_percentace+' % share','Non Director '+non_director+' % share']
          let data_per=[propValue,data.company.roc.Authorized_Capital_Rs]
          for (let i=0; i<leble.length; i++) {
              this.pieChartLabels[i]=leble[i]
              this.pieChartData[i]=data_per[i];
          }
          let charge_details:any=[]
          for (let j=data.company.charges.length-1; j>=0; j--) 
            {
              for(var propName in data.company.charges[j]) {     
                      if(data.company.charges[j].hasOwnProperty(propName)) {
                        charge_details[j]={
                          'key':propName,
                          'value':data.company.charges[j][propName],
                        }
                  
                      }
              }
            }
            this.charge_table=charge_details;
            
           
            this.diretcor_data=data.board_member
        

       },error => {},() =>console.log('donessss'));
      
    }
   

    private business_select(value,value1='')
    {
      this.year=value;
     //alert(value);
      this.CompanyService.getBusiness(this.year,this.cin).subscribe(data => { this.business_activity = data.business_activity;
      this.doughnutChartLabels=[];
      let check=0;
      let i=0;
      //alert(this.doughnutChartData.length);
      for (let j=this.doughnutChartData.length-1; j>=0; j--) 
            {
             this.doughnutChartData.splice(j,1);
              
            }
      let create_object=[];
      for (i=0; i<data.business_activity.length; i++) {
                    if(data.business_activity[i].year==this.year)
                      {
                
                        this.doughnutChartLabels[check]=data.business_activity[i].name;
                        this.doughnutChartData[check]=data.business_activity[i].turnover;
                       // create_object[check]={"id":check,"itemName":data.business_activity[i].name}
                        check++;
                      }

                      
        }
       // this.dropdownList=create_object;
        //this.dropdownListOpt=create_object
      //  this.selectedItems=create_object;
        
        if(check==0)
        {
            this.doughnutChartLabels[0]='no data';
            this.doughnutChartData[0]=0;
        }
       },error => {},() =>console.log('dones'));
    }
    
    public subsidiary(record)
    {
   
    //this.polarAreaChartLabels=[];
    let label=[]; let value = [];
      for (let i=0; i<record.length; i++) {
                   
                        label[i]=record[i].company_name;
                        this.polarAreaChartData[i]=record[i].share;
                      
        }
        this.polarAreaChartLabels=label
        //this.polarAreaChartData=value
    }
    public agency_function()
    {
    
      this.CompanyService.getRating(this.cin,this.agency).subscribe(data => {
       this.atType='all';
        let atrribute=[];
        let l=0;
        for(var propName in data.rating[0].type) {     
                  if(data.rating[0].type.hasOwnProperty(propName)) {
                     atrribute[l]=data.rating[0].type[propName];
                     l++;
                    }
        }
        this.att=atrribute;
        this.agency_type_function();
      },error => {},() =>console.log('doness'));
    }
    public agency_type_function()
    {
      
      this.lineChartLabels=[];
      this.CompanyService.getRatingDetails(this.cin,this.agency,this.atType).subscribe(data => {
        this.lineChartData = [ {data: data.response.countList, label: 'Rating'} ]; 
        this.rating=data.response.full_data
                for (let i=0; i<data.response.monthList.length; i++) {
                    this.lineChartLabels[i]=data.response.monthList[i];
                    
                }
                console.log(this.lineChartLabels);
                console.log(this.lineChartData);
      },error => {},() =>console.log('doness'));

    }
    public director_function(val)
    {
        let array_of = [{"type":"company","id":val}]
         localStorage.setItem('search_director', JSON.stringify(array_of))
         this.router.navigate(['/director']);
    }
    
    
}
