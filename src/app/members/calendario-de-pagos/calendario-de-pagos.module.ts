import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioDePagosPageRoutingModule } from './calendario-de-pagos-routing.module';

import { CalendarioDePagosPage } from './calendario-de-pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioDePagosPageRoutingModule
  ],
  declarations: [CalendarioDePagosPage]
})
export class CalendarioDePagosPageModule {}
