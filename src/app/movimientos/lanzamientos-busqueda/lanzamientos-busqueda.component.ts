import { Component, OnInit } from '@angular/core';
import { MovimientoService, MovimientoFiltro } from './../movimiento.service';
import { LazyLoadEvent } from 'primeng/api/public_api';

@Component({
  selector: 'app-lanzamientos-busqueda',
  templateUrl: './lanzamientos-busqueda.component.html',
  styleUrls: ['./lanzamientos-busqueda.component.css']
})
export class LanzamientosBusquedaComponent implements OnInit {

  lanzamientos = [];
  totalRegistros: number;
  /*descripcion: string;
  fechaVencimientoDe: Date;
  fechaVencimientoHasta: Date;*/
  filtroMov = new MovimientoFiltro();

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit() {
    // this.consultar(); //Se comenta porque se habilita LazyLoadEvent
  }

  public consultar(pagina = 0) {
    console.log('-Component- Consultado Movimientos...');

    /*const filtroMov: MovimientoFiltro = {
      descripcion: this.descripcion,
      fechaVencimientoDe: this.fechaVencimientoDe,
      fechaVencimientoHasta: this.fechaVencimientoHasta
    };*/

    // 17.6. Configurando a paginação lazy do PrimeNG
    this.filtroMov.pagina = pagina;

    // this.movimientoService.consultar({descripcion: this.descripcion})
    this.movimientoService.consultar(this.filtroMov)
      .then(lanz => {
        // this.lanzamientos = lanz;
        this.lanzamientos = lanz.movimientos;
        this.totalRegistros = lanz.total;
        console.log(this.lanzamientos);
      })
      .catch(error => {
        alert(error);
        this.lanzamientos = [
          { tipo: 'GASTO', descripcion: 'Compra de pão de queijo', fechaVencimiento: new Date(2020, 3, 26),
            fechaPago: null, valor: 4.55, persona: 'Padaria do José' },
          { tipo: 'INGRESO', descripcion: 'Venda de software', fechaVencimiento: new Date(2020, 3, 26),
            fechaPago: new Date(2020, 3, 31), valor: 80000, persona: 'Atacado Brasil' }
        ];
      });
  }

  /*
  17.6. Configurando a paginação lazy do PrimeNG
  */
  alCambiarPagina(evento: LazyLoadEvent) {
    console.log(evento);
    const pagina = evento.first / evento.rows;
    this.consultar(pagina);
  }

}
