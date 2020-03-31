import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajesValidacionComponent } from './mensajes-validacion/mensajes-validacion.component';

@NgModule({
  declarations: [MensajesValidacionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MensajesValidacionComponent
  ]
})
export class CompartidoModule { }
