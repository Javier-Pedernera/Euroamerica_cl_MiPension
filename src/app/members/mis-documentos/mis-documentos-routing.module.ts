import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisDocumentosPage } from './mis-documentos.page';

const routes: Routes = [
  {
    path: '',
    component: MisDocumentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisDocumentosPageRoutingModule {}
