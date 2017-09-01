import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { DirectorListComponent } from './director-list.component';
import { DirectorListRoutingModule } from './director-list-routing.module';

@NgModule({
  imports: [
    DirectorListRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule,
    DropdownModule
  ],
  declarations: [ DirectorListComponent ]
})
export class DirectorListModule { }
