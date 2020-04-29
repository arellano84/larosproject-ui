import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  generar() {
    console.log(this.periodoInicio);
    console.log(this.periodoFin);
  }

}
