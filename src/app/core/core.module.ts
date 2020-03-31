import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarraNavComponent } from './barra-nav/barra-nav.component';

@NgModule({
  declarations: [BarraNavComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BarraNavComponent
  ]
})
export class CoreModule { }
