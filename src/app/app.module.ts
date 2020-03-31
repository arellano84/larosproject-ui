import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';

import { NgxCurrencyModule } from "ngx-currency";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavComponent } from './barra-nav/barra-nav.component';
import { PersonasBusquedaComponent } from './personas-busqueda/personas-busqueda.component';
import { PersonasRegistroComponent } from './personas-registro/personas-registro.component';
import { FormsModule } from '@angular/forms';
import { MensajesValidacionComponent } from './mensajes-validacion/mensajes-validacion.component';
import { PersonasListaComponent } from './personas-lista/personas-lista.component';

import { MovimientosModule } from './movimientos/movimientos.module';

@NgModule({
  declarations: [
    AppComponent,
    //LanzamientosBusquedaComponent, --> Se importa ahora MovimientosModule
    BarraNavComponent,
    PersonasBusquedaComponent,
    //LanzamientoRegistroComponent, --> Se importa ahora MovimientosModule
    PersonasRegistroComponent,
    MensajesValidacionComponent,
    PersonasListaComponent
    //LanzamientosListaComponent --> Se importa ahora MovimientosModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    NgxCurrencyModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,

    MovimientosModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
