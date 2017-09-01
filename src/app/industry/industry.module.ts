import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { IndustryComponent } from './industry.component';
import { IndustryRoutingModule } from './industry-routing.module';
import { ModalModule } from 'ng2-bootstrap/modal';

@NgModule({
  imports: [
  	CommonModule,
    IndustryRoutingModule,
    FormsModule,
    ChartsModule,
    DropdownModule,
    ModalModule.forRoot(),
  ],
  declarations: [ IndustryComponent ]
})
export class IndustryModule { }
