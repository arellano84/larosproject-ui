import { Component, OnInit } from '@angular/core';
import { InformesService } from './../informes.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

/*
  23.7. Criando módulo de relatórios
*/
@Component({
  selector: 'app-informe-movimientos',
  templateUrl: './informe-movimientos.component.html',
  styleUrls: ['./informe-movimientos.component.css']
})
export class InformeMovimientosComponent implements OnInit {

  periodoInicio: Date;
  periodoFin: Date;

  constructor(
    private informesService: InformesService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
  }

  /*
    23.9. Exibindo o PDF para o usuário
  */
  generar() {

    console.log('-InformeMovimientosComponent.generar()- Consultado Movimientos por Persona...');

    console.log(this.periodoInicio);
    console.log(this.periodoFin);

    this.informesService
      .informesMovimientosPorPersona(this.periodoInicio, this.periodoFin)
      .then(informe => {
        const url = window.URL.createObjectURL(informe);

        window.open(url);
      })
      .catch(error =>  this.errorHandlerService.handle(error));

  }

}
