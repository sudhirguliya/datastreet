import { Component,OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
@Component({
  templateUrl: 'tables.component.html'
})
export class TablesComponent implements OnInit{

  constructor() { }
  dtOptions: DataTables.Settings = {};
  public types2 = [ 'type4', 'type5', 'type6' ];
  public types = [ {
      "id": 860,
      "firstName": "Superman",
      "lastName": "Yoda"
    },
    {
      "id": 870,
      "firstName": "Foo",
      "lastName": "Whateveryournameis"
    },
    {
      "id": 590,
      "firstName": "Toto",
      "lastName": "Titi"
    } ];
  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };
  }
  callType(value){
    
    if(value=='type4')
    {
     this.types = [ {
      "id": 860,
      "firstName": "Rakesh",
      "lastName": "Yoda"
    },
    {
      "id": 870,
      "firstName": "sunil",
      "lastName": "Whateveryournameis"
    },
    {
      "id": 590,
      "firstName": "sharma",
      "lastName": "Titi"
    } ];
    }
    if(value=='type5')
    {
     this.types = [ {
      "id": 860,
      "firstName": "xyz",
      "lastName": "Yoda"
    },
    {
      "id": 870,
      "firstName": "yuu",
      "lastName": "Whateveryournameis"
    },
    {
      "id": 590,
      "firstName": "sdffs",
      "lastName": "Titi"
    } ];
    }
    if(value=='type6')
    {
     this.types = [ {
      "id": 860,
      "firstName": "dsfds",
      "lastName": "Yoda"
    },
    {
      "id": 870,
      "firstName": "dfdsfds",
      "lastName": "Whateveryournameis"
    },
    {
      "id": 590,
      "firstName": "dsfdsfds",
      "lastName": "Titi"
    } ];
    }
  }

}
