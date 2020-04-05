import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ToastyService } from 'ng2-toasty';
// import {TableModule} from 'primeng/table';
import {ConfirmationService} from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { MovimientoService, MovimientoFiltro } from './../movimiento.service';
import { CategoriaService } from './../../categorias/categoria.service';

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
  // 17.8. Excluindo lançamentos e o decorador @ViewChild
  // @ViewChild('tablaMov', {static: true}) grid: Table; //TODO: Pendiente de arreglar.


  constructor(
    private movimientoService: MovimientoService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private categoriaService: CategoriaService
    ) {}

  ngOnInit() {
    // this.consultar(); //Se comenta porque se habilita LazyLoadEvent

    //TODO: TEM
    this.categoriaService.consultarTodos()
      .then(cat => {
        console.log('*****************************');
        console.log(JSON.stringify(cat));//
        console.log('*****************************');
      })
      .catch(error => {
      });

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
        // 17.12. Criando um serviço de tratamento de erros
        this.errorHandlerService.handle(error);

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
  /*
  17.10. Adicionando diálogo de confirmação antes da exclusão
  */
  confirmarEliminar(lanz: any) {
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar?',
      accept: () => {
        this.eliminar(lanz);
      }
    });
  }

  eliminar(lanz: any) {
    console.log(`-LanzamientosBusquedaComponent.eliminar- Eliminando Movimiento ${lanz.codigo}.`);
    this.movimientoService.eliminar(lanz.codigo)
    .then(() => {
      // this.grid.reset(); //Reseteando la tabla.
      console.log(`-LanzamientosBusquedaComponent.eliminar - Ciudad Movimiento ${lanz.codigo}.`);
      // 17.9. Adicionando mensagem de sucesso com Angular Toasty
      this.toasty.success(`Movimiento ${lanz.descripcion} Eliminado con Éxito.`);
    }).catch(error => {
      // 17.12. Criando um serviço de tratamento de erros
      this.errorHandlerService.handle(error);
    });
  }





      /*
  agregrar(nombre: string) {
    console.log('-Component- Agregando Ciudad...');
    this.ciudadService.agregrar({nombre})
    .then(ciudad => {
      this.consultar();
      alert(`Ciudad Agregada ${ciudad.nombre} con código ${ciudad.id}.`);
    });
  }
  atualizar(ciudad: any) {
    alert(JSON.stringify(ciudad));

    console.log('-Component- Actualizando Ciudad...');
    this.ciudadService.actualizar(ciudad)
    .then(() => {
      this.consultar();
      alert(`Ciudad Actualizada ${ciudad.nombre}.`);
    })
    .catch(error => {
      alert(error);
    });

  }

      */

}
