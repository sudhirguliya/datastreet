import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { MydashboardComponent } from './mydashboard.component';
import { MydashboardRoutingModule } from './mydashboard-routing.module';
import { DatePickerModule } from 'ng2-datepicker';
import * as moment from 'moment'

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    MydashboardRoutingModule,
    ChartsModule,
    DropdownModule,
    DatePickerModule
  ],
  declarations: [ MydashboardComponent ]
})
export class MydashboardModule { }
