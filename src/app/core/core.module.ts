import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './../seguridad/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { DashboardService } from './../dashboard/dashborad.service';
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
    DashboardService, // 23.3. Criando o serviço da Dashboard
    AuthService,
    JwtHelperService,
    ErrorHandlerService,
    Title,
  ]
})
export class CoreModule { }
