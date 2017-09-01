import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { FinancialRatioComponent } from './financial-ratio.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialRatioComponent,
    data: {
      title: 'Finanacial ratio'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRatioRoutingModule {}
