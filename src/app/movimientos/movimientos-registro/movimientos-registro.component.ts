import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {SelectItem} from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from './../../seguridad/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PersonaService } from './../../personas/persona.service';
import { MovimientoService } from './../../movimientos/movimiento.service';
import { Movimiento } from './../../core/model';

@Component({
  selector: 'app-movimientos-registro',
  templateUrl: './movimientos-registro.component.html',
  styleUrls: ['./movimientos-registro.component.css']
})
export class MovimientoRegistroComponent implements OnInit {

  tiposMovimiento;
  categorias;
  personas;
  // movimiento = new Movimiento();
  // 21.8. Criando um formulário reativo
  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private personaService: PersonaService,
    private movimientoService: MovimientoService,
    private errorHandlerService: ErrorHandlerService,
    private toasty: ToastyService,
    private route:ActivatedRoute,
    private router:Router,
    private title:Title,
    public authService:AuthService,
    private formBuilder: FormBuilder) {
    // SelectItem API with label-value pairs
    this.tiposMovimiento = [
      {label:'INGRESO', value:'INGRESO'},
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
    console.log("MovimientoRegistroComponent.ngOnInit()...");

    // 21.8. Criando um formulário reativo
    this.configurarFormulario();

    // 18.12. Definindo o título da página dinamicamente
    this.title.setTitle('Nuevo Movimiento');

    // 18.7. Preenchendo os campos na edição de lançamentos
    const codigoMovimiento = this.route.snapshot.params['codigo'];
    if(codigoMovimiento) {
      this.title.setTitle(`Modificar Movimiento [${codigoMovimiento}]`);

      this.consultarPorCodigo(codigoMovimiento);
    }

    this.cargarCategorias();
    this.cargarPersonas();
  }

  /*
    21.8. Criando um formulário reativo
  */
  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'INGRESO', Validators.required ],
      fechaVencimiento: [ null, Validators.required ],
      fechaPago: [],
      // descripcion: [null, [ Validators.required, Validators.minLength(5) ]],
      descripcion: [null, [ this.validarObligatoriedad, this.validarTamanoMinimo(4) ]], // 21.11. Criando validações customizadas
      valor: [ null, Validators.required ],
      persona: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nombre: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nombre: []
      }),
      observacion: []
    });
  }

  /*
    21.11. Criando validações customizadas
  */
  validarObligatoriedad(input: FormControl) {
    return (input.value ? null : { obligatoriedad: true });
  }
  validarTamanoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanoMinimo: { tamano: valor } };
    };
  }

  /*
  17.17. Listando as categorias cadastradas no dropdown
  */
  cargarCategorias() {
    console.log('-MovimientoRegistroComponent.cargarCategorias()- Cargando Categorias...');

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
    console.log('-MovimientoRegistroComponent.cargarPersonas()- Cargando Personas...');

    this.personaService.consultarTodos()
    .then(personas => {
      console.log(JSON.stringify(personas));
      this.personas = personas.map(per => ({label:per.nombre, value: per.codigo}));
    })
    .catch(error =>  this.errorHandlerService.handle(error));
  }

  // guardar(formMov: FormControl) {
  guardar() {
    if(!this.esModificacion) {
      this.agregrar();
    } else {
      this.actualizar();
    }
  }

  /*
    17.20. Implementando o serviço de cadastro de lançamentos
  */
  agregrar() {
    console.log('-MovimientoRegistroComponent.agregrar()- Agregando Movimiento...', this.formulario.value);
    this.movimientoService.agregrar(this.formulario.value)
    .then(movAgregado => {
      // this.grid.reset(); //Reseteando la tabla.
      console.log(`-MovimientosBusquedaComponent.agregrar - Movimiento.`);
      this.toasty.success(`Movimiento Guardado con Éxito.`);

      // formMov.reset();
      // this.movimiento = new Movimiento();
      // 18.9. Implementando navegação imperativa
      this.router.navigate(['/movimientos', movAgregado.codigo]);
    }).catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

  /*
    18.6. Desafio: implementando os serviços de atualização e busca por código
  */
  actualizar() {
    console.log('-MovimientoRegistroComponent.actualizar().- Actualizando Movimiento...');
    this.movimientoService.actualizar(this.formulario.value)
    .then(mov => {
      // this.grid.reset(); //Reseteando la tabla.
      // this.movimiento = mov;

       // 21.9. Usando a propriedade formGroup
       // this.formulario.setValue(mov);
       this.formulario.patchValue(mov);

      console.log(`-MovimientosBusquedaComponent.actualizar() - Movimiento ${this.formulario.get('descripcion').value}.`);
      this.toasty.success(`Movimiento ${this.formulario.get('descripcion').value} Actualizado con Éxito.`);
    }).catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

  consultarPorCodigo(codigo: number) {
    console.log('-MovimientoRegistroComponent.consultarPorCodigo()- Consultado Movimiento...', codigo);

    this.movimientoService.consultarPorCodigo(codigo)
      .then(mov => {
        // this.movimiento = mov;

        // 21.9. Usando a propriedade formGroup
        // this.formulario.setValue(mov); //da error: no tiene todos los campos a la vuelta.
        this.formulario.patchValue(mov);

        console.log('-MovimientoRegistroComponent.consultarPorCodigo()- Consultado Movimiento:', JSON.stringify(this.formulario.value));
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

  /*
    18.7. Preenchendo os campos na edição de lançamentos
  */
  get esModificacion() {
    // return Boolean(this.movimiento.codigo);

    // 21.9. Usando a propriedade formGroup
    return Boolean(this.formulario.get('codigo').value);
  }

  /*
    18.9. Implementando navegação imperativa
  */
  // nuevoMovimiento(formMov: FormControl) {
  nuevoMovimiento() {
    this.formulario.reset();
    // Se agrega por un bug para limpiar el nuevo movimiento.
    setTimeout(function() {
        this.movimiento = new Movimiento();
    }.bind(this), 1);

    this.router.navigate(['/movimientos/nuevo']);
  }

}
