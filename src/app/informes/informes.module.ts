import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { CompartidoModule } from './../compartido/compartido.module';
import { InformesRoutingModule } from './informes-routing.module';
import { InformeMovimientosComponent } from './informe-movimientos/informe-movimientos.component';

/*
  23.7. Criando módulo de relatórios
*/

@NgModule({
  declarations: [InformeMovimientosComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    CommonModule,
    CompartidoModule,
    InformesRoutingModule
  ]
})
export class InformesModule { }
