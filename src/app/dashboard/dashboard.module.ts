import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CompartidoModule } from './../compartido/compartido.module';
import { DashboardComponent } from './dashboard.component';

/*
  19.13. Protegendo rotas com guarda de rotas (CanActivate)
*/
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    CompartidoModule,

    DashboardRoutingModule
  ]
})
export class DashboardModule { }
