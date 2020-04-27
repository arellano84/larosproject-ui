import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

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
    PanelModule,
    ChartModule,// 23.2. Plotando gráficos com dados estáticos
    CompartidoModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
