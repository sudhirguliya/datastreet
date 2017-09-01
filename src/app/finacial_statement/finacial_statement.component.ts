import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {StatementService} from '../_services/index';
import { Http } from '@angular/http';
import { Industry } from '../_models/index';
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';
@Component({
  templateUrl: 'finacial_statement.component.html'
})
export class Finacial_statementComponent implements OnInit {
  
  
  constructor(private router: Router, private http: Http, private StatementService: StatementService) {
       // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    public overview:string='';
    public currentyear:any='';
    public lastyear:any='';
    public finance:any=[];
    public cin:string='U45200MP2009PTC021742';
    public second_level:string='assests';
    public balancesheet_menu:any=[];
    public third_level:any = 'no_current'
    public balancesheet_menu_second_level:any=[];
    public bpl_var:string='Balance Sheet'
    public company_cin:any=[this.cin]
    public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
    };
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [
      {data: [65], label: '2016'},
      {data: [28], label: '2015'}
    ];
    public chartClicked(e: any): void {
    console.log(e);
    }

    public chartHovered(e: any): void {
      console.log(e);
    }
    ngOnInit() {
      let search_company = JSON.parse(localStorage.getItem('search_compnay'));
      this.cin=search_company[0].id; 
      localStorage.setItem('reference_company', JSON.stringify(this.company_cin))
      this.bpl("Balance Sheet")
      this.dropdownList = [
          
                              {"id":'U45200MP2009PTC021743',"itemName":"Unyscape"},
                              {"id":'U45200MP2009PTC021742',"itemName":"MNO"},
                            ];
        this.selectedItems = [
                            ];
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Company",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class",
                                  "limitSelection":2,
                                  "badgeShowLimit":1
                                };            
    }
    
    
    onItemSelect(item:any){
        console.log(item.id);
        let reference_company = JSON.parse(localStorage.getItem('reference_company'));
        let check=1;
        for(let i=0;i<=reference_company.length-1;i++)
        {
            if(reference_company[i]==item.id)
            {
              check=0;
              break;
            }
        }
        if(check)
        {
          reference_company[reference_company.length]=item.id
        }
        localStorage.setItem('reference_company', JSON.stringify(reference_company))
        this.get_chart_value();
        
    }
    OnItemDeSelect(item:any){
        console.log(item.id);
        let reference_company = JSON.parse(localStorage.getItem('reference_company'));
        for(let i=0;i<reference_company.length;i++)
        {
            if(reference_company[i]==item.id)
            {
               reference_company.splice(i,1);
            }
        }
        localStorage.setItem('reference_company', JSON.stringify(reference_company))
        this.get_chart_value();
        
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }
    private bpl(val){
      let name='one';

      this.StatementService.getAllOverview(this.cin).subscribe(data => { this.overview = data.overview;
        },error => {},() =>console.log('done'));

      if(val=="Balance Sheet")
      {
        //let datas=[{"name":"assests"},{"name":"liabilities"},]
        //this.balancesheet_menu=datas;

        this.StatementService.getAll(this.cin,'balance_sheet',name).subscribe(data => {
        let assests_details:any=[]
        this.balancesheet_menu=Object.keys(data);;
        this.second_level=this.balancesheet_menu[0];
        assests_details= Object.keys(data[this.second_level]);
        
        this.balancesheet_menu_second_level=assests_details;
        this.third_level=assests_details[0];
        this.get_chart_value();
        this.render_table();
        },error => {},() =>console.log('done'));

      }else{

        this.StatementService.getAll(this.cin,'profit_loss',name).subscribe(data => {
        let assests_details:any=[]
        assests_details= Object.keys(data);
        this.balancesheet_menu=assests_details;
        this.second_level=assests_details[0]
        this.bpl2(assests_details[0])
        this.get_chart_value();
        this.render_table();
        },error => {},() =>console.log('done'));

      }
    }
    private bpl2(val){
        let name='one';
        if(this.bpl_var=="Balance Sheet")
        {
          this.StatementService.getAll(this.cin,'balance_sheet',name).subscribe(data => { 
          let assests_details:any=[]
         
          assests_details= Object.keys(data[val]);
       

          this.balancesheet_menu_second_level=assests_details;
          this.third_level=assests_details[0];
          this.get_chart_value();
          this.render_table();
          },error => {},() =>console.log('done'));
        }
        else{

          this.StatementService.getAll(this.cin,'profit_loss',name).subscribe(data => { 
          let assests_details:any=[]
          
          assests_details= Object.keys(data[val]);
        

          this.balancesheet_menu_second_level=assests_details;
          this.third_level=assests_details[0];
          this.get_chart_value();
          this.render_table();
          },error => {},() =>console.log('done'));
        }
  
    }
    private get_chart_value()
    {
      let name='';
      let reference_company = JSON.parse(localStorage.getItem('reference_company'));
      for (let j=reference_company.length-1; j>=0; j--){
          name = reference_company[j]+','+name;
      }
      
      let lastYear = ((new Date()).getFullYear())-2;
      let currentYear = ((new Date()).getFullYear()-1);
      this.currentyear=currentYear;
      this.lastyear=lastYear;
      if(this.bpl_var=="Balance Sheet")
        {

          this.StatementService.getAll(this.cin,'balance_sheet',name).subscribe(data => { 
          let data1=[];
          let data2=[];
          let bar_lebel=[];
          for (let j=0 ;j<=data.length-1; j++){
              data1[j] = data[j][this.second_level][this.third_level][currentYear]
              data2[j] = data[j][this.second_level][this.third_level][lastYear]
              this.barChartLabels[j]=data[j].company_name
          }
          

          
          
          this.barChartData = [
                {data: data1, label: currentYear},
                {data: data2, label: lastYear}
            ];
        

          },error => {},() =>console.log('done'));
        }
        else{

          this.StatementService.getAll(this.cin,'profit_loss',name).subscribe(data => { 
          let data1=[];
          let data2=[];
          let bar_lebel=[];
          for (let j=0 ;j<=data.length-1; j++){
              data1[j] = data[j][this.second_level][this.third_level][currentYear]
              data2[j] = data[j][this.second_level][this.third_level][lastYear]
              this.barChartLabels[j]=data[j].company_name
          }
          

          
          
          this.barChartData = [
                {data: data1, label: currentYear},
                {data: data2, label: lastYear}
            ];
          
          },error => {},() =>console.log('done'));
        }
    }
    private render_table()
    {
      let name='one';
      let lastYear = ((new Date()).getFullYear())-2;
      let currentYear = ((new Date()).getFullYear()-1);
      this.currentyear=currentYear;
      this.lastyear=lastYear;
      if(this.bpl_var=="Balance Sheet")
        {
           
          this.StatementService.getAll(this.cin,'balance_sheet',name).subscribe(data => { 
          let keys= Object.keys(data[this.second_level]);
          let total_array=[];
          for (let j=0; j<=keys.length-1;  j++){
              total_array[j]={"perticular":keys[j],"value1":data[this.second_level][keys[j]][this.currentyear],"value2":data[this.second_level][keys[j]][lastYear]}
          }
          this.finance=total_array
          },error => {},() =>console.log('done'));
        }
        else{
          this.StatementService.getAll(this.cin,'profit_loss',name).subscribe(data => { 
            let keys= Object.keys(data[this.second_level]);
            let total_array=[];
            for (let j=0; j<=keys.length-1;  j++){
                total_array[j]={"perticular":keys[j],"value1":data[this.second_level][keys[j]][this.currentyear],"value2":data[this.second_level][keys[j]][lastYear]}
            }
            this.finance=total_array
            },error => {},() =>console.log('done'));

        }
    }
   

}
