import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorHandlerService } from './error-handler.service';

import { BarraNavComponent } from './barra-nav/barra-nav.component';

@NgModule({
  declarations: [BarraNavComponent],
  imports: [
    CommonModule

    // ToastyModule.forRoot(),
    // ConfirmDialogModule,
  ],
  exports: [
    BarraNavComponent
  ],
  providers: [
    ErrorHandlerService
  ]
})
export class CoreModule { }
