import { Component, OnInit } from '@angular/core';
import { PersonaFiltro, PersonaService } from './../persona.service';
import { LazyLoadEvent } from 'primeng/api/public_api';

@Component({
  selector: 'app-personas-busqueda',
  templateUrl: './personas-busqueda.component.html',
  styleUrls: ['./personas-busqueda.component.css']
})
export class PersonasBusquedaComponent implements OnInit {

  personas = [];
  totalRegistros: number;
  filtroPer = new PersonaFiltro();

  constructor(private personaService: PersonaService) {}

  ngOnInit() {}

  public consultar(pagina = 0) {
    console.log('-PersonasBusquedaComponent- Consultado Personas...');

    // Filtro pagina
    this.filtroPer.pagina = pagina;

    // Consulta de personas
    this.personaService.consultar(this.filtroPer)
      .then(per => {
        this.personas = per.personas;
        this.totalRegistros = per.total;
        console.log(this.personas);
      })
      .catch(error => {
        alert(error);
        this.personas = [
          { documento: '0000M', nombre: 'Ale', apellido1: 'Arellano', apellido2: 'Rosales', activo: true },
          { documento: '0001M', nombre: 'David', apellido1: 'Arellano', apellido2: 'Rosales', activo: false }
        ];
      });

  }

  /*
    Método que controla la paginación
  */
  alCambiarPagina(evento: LazyLoadEvent) {
    console.log(evento);
    const pagina = evento.first / evento.rows;
    this.consultar(pagina);
  }

}
