import { Component, OnInit, ViewChild  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ToastyService } from 'ng2-toasty';
import {ConfirmationService} from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PersonaFiltro, PersonaService } from './../persona.service';

@Component({
  selector: 'app-personas-busqueda',
  templateUrl: './personas-busqueda.component.html',
  styleUrls: ['./personas-busqueda.component.css']
})
export class PersonasBusquedaComponent implements OnInit {

  personas = [];
  totalRegistros: number;
  filtroPer = new PersonaFiltro();
  @ViewChild('tablaPer', {static: true}) gridPer;//: Table;

  constructor(
    private personaService: PersonaService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title:Title) {}

  ngOnInit() {
    this.title.setTitle('Busqueda de Personas');
  }

  public consultar(pagina = 0) {
    console.log('-PersonasBusquedaComponent- Consultado Personas...');

    // Filtro pagina
    this.filtroPer.pagina = pagina;

    /*
      Consulta lista de Personas.
    */
    this.personaService.consultar(this.filtroPer)
      .then(per => {
        this.personas = per.personas;
        this.totalRegistros = per.total;
        console.log(this.personas);
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
        this.personas = [
          { documento: '0000M', nombre: 'Ale', apellido1: 'Arellano', apellido2: 'Rosales', activo: true },
          { documento: '0001M', nombre: 'David', apellido1: 'Arellano', apellido2: 'Rosales', activo: false }
        ];
      });
  }

  /*
    Confirma la eliminación de Persona.
  */
  confirmarEliminar(per: any) {
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar?',
      accept: () => {
        this.eliminar(per);
      }
    });
  }

  /*
    Elimina un registro de Persona.
  */
  eliminar(per: any) {
    console.log(`-PersonasBusquedaComponent.eliminar- Eliminando Persona ${per.codigo}.`);
    this.personaService.eliminar(per.codigo)
    .then(() => {
      console.log(`-PersonasBusquedaComponent.eliminar - Persona ${per.codigo}.`);
      this.gridPer.reset(); // Reseteando la tabla.
      this.toasty.success(`${per.nombre} Ha sido eliminado con éxito.`);
    }).catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

  /*
    Controla la paginación
  */
  alCambiarPagina(evento: LazyLoadEvent) {
    console.log(evento);
    const pagina = evento.first / evento.rows;
    this.consultar(pagina);
  }

  /*
    Cambia el estado de la persona.
  */
 actualizarEstado(per: any) {
    console.log(`-PersonasBusquedaComponent.atualizarEstado- Actulizando estado Persona ${per.codigo}.`);

    const nuevoEstado = !per.activo;
    this.personaService.actualizarEstado(per.codigo, nuevoEstado)
    .then(() => {
      console.log(`-PersonasBusquedaComponent.atualizarEstado - Persona ${per.codigo}.`);
       this.gridPer.reset(); // Reseteando la tabla.
        const accion = nuevoEstado ? 'ativada' : 'desativada';
        // per.ativo = nuevoEstado;
        this.toasty.success(`Persona ${per.nombre} ${accion} con éxito!`);
    }).catch(error => {
      this.errorHandlerService.handle(error);
    });

  }

}
