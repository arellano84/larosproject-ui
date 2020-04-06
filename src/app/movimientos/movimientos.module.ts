import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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

import { MovimientoService } from './movimiento.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PersonaService } from './../personas/persona.service';

@NgModule({
  declarations: [LanzamientosBusquedaComponent,LanzamientoRegistroComponent,LanzamientosListaComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,

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
  ],
  providers: [MovimientoService, CategoriaService, PersonaService]
})
export class MovimientosModule { }
