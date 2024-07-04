import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudClavePage } from './solicitud-clave.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudClavePageRoutingModule {}
