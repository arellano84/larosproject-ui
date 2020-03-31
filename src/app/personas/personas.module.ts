import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

import { CompartidoModule } from './../compartido/compartido.module';

import { PersonasRegistroComponent } from './personas-registro/personas-registro.component';
import { PersonasListaComponent } from './personas-lista/personas-lista.component';
import { PersonasBusquedaComponent } from './personas-busqueda/personas-busqueda.component';


@NgModule({
  declarations: [PersonasBusquedaComponent, PersonasRegistroComponent, PersonasListaComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,

    CompartidoModule
  ],
  exports: [
    PersonasBusquedaComponent,
    PersonasRegistroComponent
  ]
})
export class PersonasModule { }
