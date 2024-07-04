import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudClavePageRoutingModule } from './solicitud-clave-routing.module';

import { SolicitudClavePage } from './solicitud-clave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudClavePageRoutingModule
  ],
  declarations: [SolicitudClavePage]
})
export class SolicitudClavePageModule {}
