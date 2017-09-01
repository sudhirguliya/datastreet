import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { FinancialRatioComponent } from './financial-ratio.component';
import { FinancialRatioRoutingModule } from './financial-ratio-routing.module';
import { DatePickerModule } from 'ng2-datepicker';
import * as moment from 'moment'
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
  imports: [
  	CommonModule,
    FinancialRatioRoutingModule,
    FormsModule,
    ChartsModule,
    DropdownModule,
    DatePickerModule,
    AngularMultiSelectModule
  ],
  declarations: [ FinancialRatioComponent ]
})
export class FinancialRatioModule { }
