import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-lanzamiento-registro',
  templateUrl: './lanzamiento-registro.component.html',
  styleUrls: ['./lanzamiento-registro.component.css']
})
export class LanzamientoRegistroComponent implements OnInit {

  tiposLanzamiento;

  constructor() {
    // SelectItem API with label-value pairs
    this.tiposLanzamiento = [
      {label:'Receta', value:'0'},
      {label:'Despesa', value:'1'}
    ];
  }

  ngOnInit(): void {
  }

}
