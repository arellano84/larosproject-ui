import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { NgxCurrencyModule } from 'ngx-currency';

import { CompartidoModule } from './../compartido/compartido.module';

import { LanzamientosListaComponent } from './lanzamientos-lista/lanzamientos-lista.component';
import { LanzamientoRegistroComponent } from './lanzamiento-registro/lanzamiento-registro.component';
import { LanzamientosBusquedaComponent } from './lanzamientos-busqueda/lanzamientos-busqueda.component';


@NgModule({
  declarations: [LanzamientosBusquedaComponent,LanzamientoRegistroComponent,LanzamientosListaComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    NgxCurrencyModule,

    CompartidoModule
  ],
  exports: [
    LanzamientosBusquedaComponent,
    LanzamientoRegistroComponent
    // LanzamientosListaComponent
  ]
})
export class MovimientosModule { }
