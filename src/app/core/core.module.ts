import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from './../seguridad/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { BarraNavComponent } from './barra-nav/barra-nav.component';
import { PaginaNoEncotradaComponent } from './pagina-no-encotrada.component';

@NgModule({
  declarations: [BarraNavComponent, PaginaNoEncotradaComponent],
  imports: [
    CommonModule,
    RouterModule
    // ToastyModule.forRoot(),
    // ConfirmDialogModule,
  ],
  exports: [
    BarraNavComponent
  ],
  providers: [
    AuthService,
    ErrorHandlerService,
    Title
  ]
})
export class CoreModule { }
