import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DirectorListComponent } from './director-list.component';

const routes: Routes = [
  {
    path: '',
    component: DirectorListComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorListRoutingModule {}