import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisDocumentosPageRoutingModule } from './mis-documentos-routing.module';

import { MisDocumentosPage } from './mis-documentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisDocumentosPageRoutingModule
  ],
  declarations: [MisDocumentosPage]
})
export class MisDocumentosPageModule {}
