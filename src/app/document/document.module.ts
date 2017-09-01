import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { DocumentComponent } from './document.component';
import { DocumentRoutingModule } from './document-routing.module';

@NgModule({
  imports: [
    DocumentRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule,
    DropdownModule
  ],
  declarations: [ DocumentComponent ]
})
export class DocumentModule { }
