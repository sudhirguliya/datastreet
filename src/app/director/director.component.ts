import { Component, OnInit,Pipe } from '@angular/core';
import { Router } from '@angular/router';
import {DirectorService} from '../_services/index';
import { Http } from '@angular/http';
import { Director } from '../_models/index';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import * as moment from 'moment'



@Component({
  templateUrl: 'director.component.html'
})
export class DirectorComponent implements OnInit {

  // constructor( ) { }
   
   date: DateModel;
   options: DatePickerOptions;

   constructor(private router: Router, private http: Http, private DirectorService:DirectorService) {
   this.options = new DatePickerOptions();
   }

  public director_content: string ="loading";
  public name: string ="loading";
  public father_name: string ="loading";
  public designation: string ="loading";
  public dob: string ="loading";
  public pan: string ="loading";
  public social: string ="loading";
  public din_dpin:string="loading";
  public facebook:string="";
  public twitter:string="";
  public linkedin:string="";


  public graph_count:any=[];
  public maindata:any='';
  public pandata:any='';
  public fromDate:string='01-01-2017';
  public toDate:string  ='01-01-2018';

  public toDateObj:any='';
  public fromDateObj:any='';
  public currentyear:any='';
  public lastyear:any='';
  public stakeYear:string='2016';



  
  public userDin: string='182894';



  public brandPrimary: string =  '#20a8d8';
  public brandSuccess: string =  '#4dbd74';
  public brandInfo: string =   '#63c2de';
  public brandWarning: string =  '#f8cb00';
  public brandDanger: string =   '#f86c6b';

  // dropdown buttons
  public status: { isopen: boolean } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  // PolarArea
  //public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  //public polarAreaChartData: number[] = [300, 150, 100, 40, 820];
  public company:any='';
  public blancesheetArr:any=['No Data'];
  public blancesheet:any='';

  public assetsArr:any=['No Data'];
  public assets:any='';
  

  public polarAreaChartData: Array<any> = ['A','B'];
  public polarAreaChartLabels: Array<any> = ['1','2'];


  public polarAreaLegend: boolean = true;

  public polarAreaChartType: string = 'polarArea';

  
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



  //multidropdone
  public mycompany:any=[];
  public mycompany2:any=[];
  public pSelectCompany:any=[];
  public pSelectCompany2:any=[];

  
  dropdownSettings = {};
  dropdownSettings2 = {};




  // Doughnut
  //public doughnutChartLabels: string[] = ['Ds', 'In-Store Sales', 'Mail-Order Sales'];
  //public doughnutChartData: number[] = [-50, 450, 100];


  public doughnutChartData: Array<any> = ['A','B'];
  public doughnutChartLabels:Array<any> = ['1','2'];
  public doughnutChartType: string = 'doughnut';




  // barChart
 // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:any[] = ['Uny','Scape'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;


 public barChartData: Array<any> = [
     {data: [65], label: '2016'},
     {data: [28], label: '2015'}
   ];



  ngOnInit(){

   let eLArr:any=[];
   let compytemp:any='';
   this.DirectorService.get_company(this.userDin)
            .subscribe(data => { 
                console.log(data);

                for (let i=0; i<data.response.data.length; i++) 
                {
                  
                   compytemp = {
                          'id':data.response.data[i].company.roc.CIN,
                          'itemName':data.response.data[i].company.roc.COMPANY_NAME
                   };
                   eLArr.push(compytemp);
                  
                }
                this.mycompany=eLArr;
                this.mycompany2=eLArr;
                this.pSelectCompany=eLArr;
                this.pSelectCompany2=eLArr;
                
                });


     this.directorDetails();
    
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


      //dropdone

      this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Company",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  badgeShowLimit:1,
                                  classes:"company1"
                                }; 
      this.dropdownSettings2 = { 
                                  singleSelection: false, 
                                  text:"Select Company",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  badgeShowLimit:1,
                                  classes:"company2"
                                }; 
       this.stakeFilter();
  }
  
  private newsFilterFromDate(v){
   this.fromDate =v.formatted;
   this.newsFilter();
  }

  private newsFilterToDate(v1){
   this.toDate =v1.formatted;
   this.newsFilter();
  }

  private newsFilter()
  {
      this.lineChartData = [
        {data: [], label: ''}
      ];
      this.lineChartLabels=[];
      if(this.category=='news')
      {
        this.DirectorService.getNewsTopic().subscribe(data => { this.news_topic=data;});
      }
      else{
        this.news_topic=[];
      }
      this.heading = this.category;
      this.DirectorService.get_news_details(this.topic,this.category,this.userDin,this.fromDate,this.toDate).subscribe(
      data => { this.lineChartData = [ {data: data.response.countList, label: this.heading} ]; 
                for (let i=0; i<data.response.monthList.length; i++) {
                    this.lineChartLabels.push(data.response.monthList[i]);
                }
                this.newslegalsocial=data.response.full_data
                }) 
  }

  private directorDetails() {

        this.newsFilter();
        this.equityDistribution();

        this.DirectorService.getDirectorInfo(this.userDin)
            .subscribe(data => { 
                console.log(data);
                if(data.response.data.company.signatories[0].main_data.DirectorInfo) 
                {
                    this.director_content =data.response.data.company.signatories[0].main_data.DirectorInfo;
                }
                else 
                {
                    this.director_content ='';
                }
                    
                if(this.maindata=data.response.data.company.signatories[0].main_data) 
                {
                   (this.maindata.FathersName) ? this.father_name = this.maindata.FathersName :  this.father_name =''; 
                    
                   
                   (this.maindata.DIN_DPIN) ? this.din_dpin = this.maindata.DIN_DPIN : this.din_dpin='';

                   (this.maindata.DateOfBirth) ? this.dob = this.maindata.DateOfBirth : this.dob =''; 
                    (this.maindata.Designation) ? this.designation = this.maindata.Designation : this.designation ='Director'; 

                    (this.maindata.Linkedin) ? this.linkedin = this.maindata.Linkedin : this.linkedin =''; 
                    (this.maindata.Facebook) ? this.facebook = this.maindata.Facebook : this.facebook =''; 

                    (this.maindata.Twitter) ? this.twitter = this.maindata.Twitter : this.twitter =''; 

                }
                if(this.pandata = data.response.data.company.signatories[0].pan_data) 
                {
                   (this.pandata.Name) ? this.name = this.pandata.Name : this.name ='';

                   (this.pandata.PermanentAccountNumber) ? this.pan = this.pandata.PermanentAccountNumber :this.pandata='';
                   
                }


                  this.social='N/A';

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
              
             
    }

  private equityDistribution()
  {

      let companyEquity='';
      let directorShare='';
      let percentageEquity='';

     let eQArr:any=[];
     this.polarAreaChartLabels=[];
      
     this.DirectorService.get_director_equity(this.userDin)
            .subscribe(data => { 
                console.log(data);

                for (let i=0; i<data.response.data.length; i++) 
                {
                   this.polarAreaChartLabels.push(data.response.data[i].company.roc.COMPANY_NAME);

                   companyEquity =data.response.data[i].company.roc["Authorized_Capital_Rs"];

                    directorShare =data.response.data[i].board_member[0]["# Share 2016"];
                    directorShare = directorShare.replace( /,/g, "" );

                    eQArr.push((parseFloat(directorShare)/parseFloat(companyEquity)).toFixed(2));

                }
                this.polarAreaChartData  =eQArr;
                
       
                 //call------------portfolio
                 this.bsheetFilter();
                
                });

  }

  
  //portfolio section
  onItemSelect(item:any){
        //console.log(item);
        //console.log(this.pSelectCompany);
        this.bsheetFilter();
    }
    OnItemDeSelect(item:any){
       console.log(item);
        console.log(this.pSelectCompany);
       this.bsheetFilter();
    }
    onSelectAll(items: any){
        //console.log(items);
        this.bsheetFilter();
    }
    onDeSelectAll(items: any){
       // console.log(items);
       this.bsheetFilter();
    }
   
  private bsheetFilter()
  {
      let sComy:any=[];
      for (let i=0; i<this.pSelectCompany.length; i++) 
      {
         sComy.push(this.pSelectCompany[i].id);
      }

     this.DirectorService.get_blance_sheet(sComy).subscribe(data => {
     if(data.response.data!=null)   {
      this.blancesheetArr=Object.keys(data.response.data);
      this.blancesheet='Balance Sheet';
      this.blancesheet=this.blancesheetArr[0];

     }
     else {
     this.blancesheetArr=['No Data'];
     }
       
    });
    this.assetsArr=['Assets'];
     this.assetsChange();
    }


  private assetsChange()
  {
    if(this.blancesheet!='Balance Sheet' && this.blancesheet!='No Data') 
    {
      let sComy:any=[];
      for (let i=0; i<this.pSelectCompany.length; i++) 
      {
         sComy.push(this.pSelectCompany[i].id);
      }

      this.DirectorService.get_blance_sheet(sComy).subscribe(data => {
        if(data.response.data !=null)   {
          this.assetsArr = Object.keys(data.response.data[this.blancesheet]);
          this.assets=this.assetsArr[0];
        }
       });
    }
    else {
     this.assetsArr=['Assets'];
    }
    this.assetsFilter();
  }

  private assetsFilter()
  {

   let lastYear = ((new Date()).getFullYear())-2;
   let currentYear = ((new Date()).getFullYear()-1);
   this.currentyear=currentYear;
   this.lastyear=lastYear;
   let data1=[];
   let data2=[];
   let bar_lebel=[];
   let sComy:any=[];

   this.doughnutChartLabels=[];
  
   
   let fCompany=[];

        for (let i=0; i<this.pSelectCompany.length; i++) 
        {
           sComy.push(this.pSelectCompany[i].id);
        }

       this.DirectorService.get_portfolio(sComy).subscribe(data => {
          for (let i=0; i<data.response.data.length; i++) 
          {
             data1[i] = data.response.data[i][this.blancesheet][this.assets][currentYear];
             data2[i] = data.response.data[i][this.blancesheet][this.assets][lastYear];
             this.doughnutChartLabels.push(data.response.data[i].company_name+' - '+this.blancesheet);
         }
         this.doughnutChartData= data1;


       });

         


  }
  
  private stakeFilter()
  {
    let dShare1:string='';
    let dShare2:string='';
    let shertStr:any='';
    let strLab='';
    let lastYear:number = ((new Date()).getFullYear())-2;
    let currentYear:number = ((new Date()).getFullYear()-1);

    this.barChartLabels=[];
      this.DirectorService.get_director_equity(this.userDin)
      .subscribe(data => { 
        for (let i=0; i<data.response.data.length; i++) 
        { 
           dShare1=data.response.data[i].board_member[0]["# Share 2015"];
           dShare2=data.response.data[i].board_member[0]["# Share 2016"];
           this.barChartData[i]= {data: [dShare1,dShare2], label: data.response.data[i].company.roc.COMPANY_NAME};
        }
       this.barChartLabels=[lastYear,currentYear];
       
        
      });

  }
//Stake section
  onItemSelect2(item:any){
        this.stakeFilter();
    }
    OnItemDeSelect2(item:any){
       this.stakeFilter();
    }
    onSelectAll2(items: any){
        this.stakeFilter();
    }
    onDeSelectAll2(items: any){
       // console.log(items);
       this.stakeFilter();
    }
  

}
