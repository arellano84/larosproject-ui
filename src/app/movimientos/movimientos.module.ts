import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MovimientosRoutingModule } from './movimientos-routing.module';

import { MovimientosListaComponent } from './movimientos-lista/movimientos-lista.component';
import { MovimientoRegistroComponent } from './movimientos-registro/movimientos-registro.component';
import { MovimientosBusquedaComponent } from './movimientos-busqueda/movimientos-busqueda.component';

import { MovimientoService } from './movimiento.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PersonaService } from './../personas/persona.service';


@NgModule({
  declarations: [MovimientosBusquedaComponent,MovimientoRegistroComponent,MovimientosListaComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // RouterModule,
    ReactiveFormsModule, // 21.8. Criando um formulário reativo

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    NgxCurrencyModule,

    CompartidoModule,
    MovimientosRoutingModule
  ],
  exports: [
    /*
    18.11. Tratando rota não encontrada
    Como se utiliza el ruteador ya no es necesario agregar.
    MovimientosBusquedaComponent,
    MovimientoRegistroComponent*/
    // MovimientosListaComponent
  ],
  providers: [MovimientoService, CategoriaService, PersonaService]
})
export class MovimientosModule { }
