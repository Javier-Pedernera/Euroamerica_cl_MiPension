import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentrosDeAtencionPage } from './centros-de-atencion.page';

const routes: Routes = [
  {
    path: '',
    component: CentrosDeAtencionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentrosDeAtencionPageRoutingModule {}
