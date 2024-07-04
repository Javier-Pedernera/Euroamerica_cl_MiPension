import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioDePagosPage } from './calendario-de-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioDePagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioDePagosPageRoutingModule {}
