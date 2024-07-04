import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CentrosDeAtencionPageRoutingModule } from './centros-de-atencion-routing.module';
import { CentrosDeAtencionPage } from './centros-de-atencion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CentrosDeAtencionPageRoutingModule
  ],
  declarations: [CentrosDeAtencionPage]
})
export class CentrosDeAtencionPageModule {}
