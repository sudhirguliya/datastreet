import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MydashboardComponent } from './mydashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MydashboardComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MydashboardRoutingModule {}