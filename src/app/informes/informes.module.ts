import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from './../compartido/compartido.module';
import { InformesRoutingModule } from './informes-routing.module';
import { InformeMovimientosComponent } from './informe-movimientos/informe-movimientos.component';

/*
  23.7. Criando módulo de relatórios
*/

@NgModule({
  declarations: [InformeMovimientosComponent],
  imports: [
    CommonModule,
    CompartidoModule,
    InformesRoutingModule
  ]
})
export class InformesModule { }
