import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PersonaService } from './../../personas/persona.service';
import { MovimientoService } from './../../movimientos/movimiento.service';
import { Movimiento } from './../../core/model';

@Component({
  selector: 'app-lanzamiento-registro',
  templateUrl: './lanzamiento-registro.component.html',
  styleUrls: ['./lanzamiento-registro.component.css']
})
export class LanzamientoRegistroComponent implements OnInit {

  tiposLanzamiento;
  categorias;
  personas;
  movimiento = new Movimiento();

  constructor(
    private categoriaService: CategoriaService,
    private personaService: PersonaService,
    private movimientoService: MovimientoService,
    private errorHandlerService: ErrorHandlerService,
    private toasty: ToastyService,
    private route:ActivatedRoute) {
    // SelectItem API with label-value pairs
    this.tiposLanzamiento = [
      {label:'INGRESO', value:'RECETA'},// TODO: cambiar en el back el tipo
      {label:'GASTO', value:'GASTO'}
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
    console.log("LanzamientoRegistroComponent.ngOnInit()...");

    console.log(this.route.snapshot.params['codigo']);
    this.consultarPorCodigo(this.route.snapshot.params['codigo']);

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
      // this.categorias = categorias.map(cat => ({label:cat.nombre, value: cat.codigo}));
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

  /*
    17.20. Implementando o serviço de cadastro de lançamentos
  */
  agregrar(formMov: FormControl) {
    console.log('-LanzamientoRegistroComponent.agregrar()- Agregando Movimiento...', this.movimiento);
    this.movimientoService.agregrar(this.movimiento)
    .then(() => {
      // this.grid.reset(); //Reseteando la tabla.
      console.log(`-LanzamientosBusquedaComponent.agregrar - Movimiento.`);
      this.toasty.success(`Movimiento Guardado con Éxito.`);

      formMov.reset();
      this.movimiento = new Movimiento();
    }).catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

  /*
    18.6. Desafio: implementando os serviços de atualização e busca por código
  */
  atualizar(formMov: FormControl) {
    // movimiento.codigo==null?agregrar(instFormLanzamiento):actualizar(instFormLanzamiento)

    console.log('-LanzamientoRegistroComponent.atualizar().- Actualizando Movimiento...');
    this.movimientoService.actualizar(this.movimiento)
    .then(() => {
      // this.grid.reset(); //Reseteando la tabla.
      console.log(`-LanzamientosBusquedaComponent.atualizar() - Movimiento ${this.movimiento.descripcion}.`);
      this.toasty.success(`Movimiento ${this.movimiento.descripcion} Actualizado con Éxito.`);
    }).catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

  consultarPorCodigo(codigo: number) {
    console.log('-LanzamientoRegistroComponent.consultarPorCodigo()- Consultado Movimiento...');

    this.movimientoService.consultarPorCodigo(codigo)
      .then(mov => {
        this.movimiento = mov;
        console.log('-LanzamientoRegistroComponent.consultarPorCodigo()- Consultado Movimiento:', JSON.stringify(this.movimiento));
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

}
