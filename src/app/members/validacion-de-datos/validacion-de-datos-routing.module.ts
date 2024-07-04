import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidacionDeDatosPage } from './validacion-de-datos.page';

const routes: Routes = [
  {
    path: '',
    component: ValidacionDeDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidacionDeDatosPageRoutingModule {}
