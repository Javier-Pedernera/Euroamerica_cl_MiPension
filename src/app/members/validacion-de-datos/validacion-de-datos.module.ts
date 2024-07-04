import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidacionDeDatosPageRoutingModule } from './validacion-de-datos-routing.module';

import { ValidacionDeDatosPage } from './validacion-de-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidacionDeDatosPageRoutingModule
  ],
  declarations: [ValidacionDeDatosPage]
})
export class ValidacionDeDatosPageModule {}
