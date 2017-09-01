import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { LegalComponent } from './legal.component';
import { LegalRoutingModule } from './legal-routing.module';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DatePickerModule } from 'ng2-datepicker';
import * as moment from 'moment'
@NgModule({
  imports: [
  	CommonModule,
    LegalRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ChartsModule,
    DropdownModule,
    DatePickerModule
  ],
  declarations: [ LegalComponent ]
})
export class LegalModule { }
