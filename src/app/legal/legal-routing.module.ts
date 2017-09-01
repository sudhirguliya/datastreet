import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
     

import { LegalComponent } from './legal.component';

const routes: Routes = [
  {
    path: '',
    component: LegalComponent,
    data: {
      title: 'Legal Cases'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule {}
