import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

import { CompartidoModule } from './../compartido/compartido.module';
import { MovimientosRoutingModule } from './personas-routing.module';

import { PersonasRegistroComponent } from './personas-registro/personas-registro.component';
import { PersonasListaComponent } from './personas-lista/personas-lista.component';
import { PersonasBusquedaComponent } from './personas-busqueda/personas-busqueda.component';

import { PersonaService } from './persona.service';


@NgModule({
  declarations: [PersonasBusquedaComponent, PersonasRegistroComponent, PersonasListaComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    //RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,

    CompartidoModule,
    MovimientosRoutingModule
  ],
  exports: [
    /*
    18.11. Tratando rota não encontrada
    Como se utiliza el ruteador ya no es necesario agregar.
    PersonasBusquedaComponent,
    PersonasRegistroComponent*/
  ],
  providers: [
    PersonaService
  ]
})
export class PersonasModule { }
