import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { Finacial_statementComponent } from './finacial_statement.component';
import { Finacial_statementRoutingModule } from './finacial_statement-routing.module';
import { ModalModule } from 'ng2-bootstrap/modal';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    Finacial_statementRoutingModule,
    ChartsModule,
    ModalModule.forRoot(),
    DropdownModule,
    AngularMultiSelectModule
  ],
  declarations: [ Finacial_statementComponent ]
})
export class Finacial_statementModule { }
