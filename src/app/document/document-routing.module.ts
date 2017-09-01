import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DocumentComponent } from './document.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentComponent,
    data: {
      title: 'Document'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule {}