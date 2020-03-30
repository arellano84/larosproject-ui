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
import { LanzamientosBusquedaComponent } from './lanzamientos-busqueda/lanzamientos-busqueda.component';
import { BarraNavComponent } from './barra-nav/barra-nav.component';
import { PersonasBusquedaComponent } from './personas-busqueda/personas-busqueda.component';
import { LanzamientoRegistroComponent } from './lanzamiento-registro/lanzamiento-registro.component';
import { PersonasRegistroComponent } from './personas-registro/personas-registro.component';
import { FormsModule } from '@angular/forms';
import { MensajesValidacionComponent } from './mensajes-validacion/mensajes-validacion.component';
import { PersonasListaComponent } from './personas-lista/personas-lista.component';
import { LanzamientosListaComponent } from './lanzamientos-lista/lanzamientos-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    LanzamientosBusquedaComponent,
    BarraNavComponent,
    PersonasBusquedaComponent,
    LanzamientoRegistroComponent,
    PersonasRegistroComponent,
    MensajesValidacionComponent,
    PersonasListaComponent,
    LanzamientosListaComponent
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
    InputMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
