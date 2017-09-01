import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import {AccordionModule} from "ng2-accordion";

@NgModule({
  imports: [
    CompanyRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    ModalModule.forRoot(),
    AccordionModule,
    AngularMultiSelectModule
  ],
  declarations: [ CompanyComponent ]
})
export class CompanyModule { }
