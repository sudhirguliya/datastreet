import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { TrademarkComponent } from './trademark.component';
import { TrademarkRoutingModule } from './trademark-routing.module';

@NgModule({
  imports: [
  	CommonModule,
    TrademarkRoutingModule,
    FormsModule,
    ChartsModule,
    DropdownModule
  ],
  declarations: [ TrademarkComponent ]
})
export class TrademarkModule { }
