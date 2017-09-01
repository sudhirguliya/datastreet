import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { Finacial_statementComponent } from './finacial_statement.component';

const routes: Routes = [
  {
    path: '',
    component: Finacial_statementComponent,
    data: {
      title: 'Financial Statement'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Finacial_statementRoutingModule {}