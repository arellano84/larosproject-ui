import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-lanzamiento-registro',
  templateUrl: './lanzamiento-registro.component.html',
  styleUrls: ['./lanzamiento-registro.component.css']
})
export class LanzamientoRegistroComponent implements OnInit {

  tiposLanzamiento;
  categorias;
  personas;

  constructor() {
    // SelectItem API with label-value pairs
    this.tiposLanzamiento = [
      {label:'Receta', value:'0'},
      {label:'Despesa', value:'1'}
    ];
    this.categorias = [
      {label:'Alimentación', value: 1},
      {label:'Transporte', value: 2}
    ];
    this.personas = [
      {label:'Luis', value: 1},
      {label:'Rayssa', value: 2},
      {label:'David', value: 3}
    ];
  }

  ngOnInit(): void {
  }

}
