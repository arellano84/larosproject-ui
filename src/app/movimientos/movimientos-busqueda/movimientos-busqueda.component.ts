import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ToastyService } from 'ng2-toasty';
// import {TableModule} from 'primeng/table';
import {ConfirmationService} from 'primeng/api';

import { AuthService } from './../../seguridad/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MovimientoService, MovimientoFiltro } from './../movimiento.service';

@Component({
  selector: 'app-movimientos-busqueda',
  templateUrl: './movimientos-busqueda.component.html',
  styleUrls: ['./movimientos-busqueda.component.css']
})
export class MovimientosBusquedaComponent implements OnInit {

  movimientos = [];
  totalRegistros: number;
  /*descripcion: string;
  fechaVencimientoDe: Date;
  fechaVencimientoHasta: Date;*/
  filtroMov = new MovimientoFiltro();
  // 17.8. Excluindo lançamentos e o decorador @ViewChild
  @ViewChild('tablaMov', {static: true}) gridMov;//: Table;

  constructor(
    private movimientoService: MovimientoService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private authService: AuthService) {}

  ngOnInit() {
    // 18.12. Definindo o título da página dinamicamente
    this.title.setTitle('Busqueda de Movimientos');

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
      .then(mov => {
        // this.movimientos = mov;
        this.movimientos = mov.movimientos;
        this.totalRegistros = mov.total;
        console.log(this.movimientos);
      })
      .catch(error => {
        // 17.12. Criando um serviço de tratamento de erros
        this.errorHandlerService.handle(error);

        this.movimientos = [
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
  /*
  17.10. Adicionando diálogo de confirmação antes da exclusão
  */
  confirmarEliminar(mov: any) {
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar?',
      accept: () => {
        this.eliminar(mov);
      }
    });
  }

  eliminar(mov: any) {
    console.log(`-MovimientosBusquedaComponent.eliminar- Eliminando Movimiento ${mov.codigo}.`);
    this.movimientoService.eliminar(mov.codigo)
    .then(() => {
      this.gridMov.reset(); //Reseteando la tabla.
      console.log(`-MovimientosBusquedaComponent.eliminar - Ciudad Movimiento ${mov.codigo}.`);
      // 17.9. Adicionando mensagem de sucesso com Angular Toasty
      this.toasty.success(`Movimiento ${mov.descripcion} Eliminado con Éxito.`);
    }).catch(error => {
      // 17.12. Criando um serviço de tratamento de erros
      this.errorHandlerService.handle(error);
    });
  }

}
