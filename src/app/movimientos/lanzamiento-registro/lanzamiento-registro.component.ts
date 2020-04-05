import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PersonaService } from './../../personas/persona.service';

@Component({
  selector: 'app-lanzamiento-registro',
  templateUrl: './lanzamiento-registro.component.html',
  styleUrls: ['./lanzamiento-registro.component.css']
})
export class LanzamientoRegistroComponent implements OnInit {

  tiposLanzamiento;
  categorias;
  personas;

  constructor(
    private categoriaService: CategoriaService,
    private personaService: PersonaService,
    private errorHandlerService: ErrorHandlerService) {
    // SelectItem API with label-value pairs
    this.tiposLanzamiento = [
      {label:'Ingreso', value:'0'},
      {label:'Gasto', value:'1'}
    ];
    /*this.categorias = [
      {label:'Alimentación', value: 1},
      {label:'Transporte', value: 2}
    ];*/
    /*this.personas = [
      {label:'Luis', value: 1},
      {label:'Rayssa', value: 2},
      {label:'David', value: 3}
    ];*/
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarPersonas();
  }

  /*
  17.17. Listando as categorias cadastradas no dropdown
  */
  cargarCategorias() {
    console.log('-LanzamientoRegistroComponent.cargarCategorias()- Cargando Categorias...');

    this.categoriaService.consultarTodos()
    .then(categorias => {
      console.log(JSON.stringify(categorias));
      this.categorias = categorias.map(cat => {
        return {label:cat.nombre, value: cat.codigo};
      });
      //this.categorias = categorias.map(cat => ({label:cat.nombre, value: cat.codigo}));
    })
    .catch(error =>  this.errorHandlerService.handle(error));
  }

  /*
  17.18. Desafio: listando as pessoas cadastradas no dropdown
  */
 cargarPersonas() {
  console.log('-LanzamientoRegistroComponent.cargarPersonas()- Cargando Personas...');

  this.personaService.consultarTodos()
  .then(personas => {
    console.log(JSON.stringify(personas));
    this.personas = personas.map(per => ({label:per.nombre, value: per.codigo}));
  })
  .catch(error =>  this.errorHandlerService.handle(error));
}

}
