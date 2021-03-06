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
  uploadEnProceso = false; // 23.22. Utilizando componente ProgressSpinner

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
      observacion: [],
      anexo: [],
      urlAnexo: []
    });
  }

  /*
    21.11. Criando validações customizadas
  */
  validarObligatoriedad(input: FormControl) {
    // input.root.get('fechaVencimiento').value // se puede acceder a otros campos.
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

        // TODO: 23.00.00 Modificando url, verificar si es eficiente esto.
        mov.urlAnexo= mov.urlAnexo?(mov.urlAnexo as string).replace('\\', 'https://'):'';

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


  /*
    23.19. Upload com o componente FileUpload
  */
  get urlUploadAnexo() {
    console.log('-MovimientoRegistroComponent.urlUploadAnexo()- Anexando...');
    return this.movimientoService.urlUploadAnexo();
  }
  antesUploadAnexo(event) {
    /*
      Na versão mais atual do PrimeNG a propriedade onBeforeSend é onBeforeUpload
      Porém, como usamos o HttpClient, ao invés do Http, não precisaremos do método "antesUploadAnexo"
      Definimos já um interceptador que fará esse papel antes de todas as requisições com HttpClient.
      Como esse componente também o utiliza, não precisaremos adicionar esse cabeçalho da forma mostrada na aula.
    */
    //event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.uploadEnProceso = true;
  }

  /*
    23.20. Fazendo download do anexo
  */
  alTerminarUploadAnexo(event) {
    /*Na versão mais atual do PrimeNG quando passamos o objeto event para nosso método, seu tipo é diferente do mostrado na aula.
    O objeto que recebemos como argumento não tem a propriedade xhr.
    Para obtermos acesso ao objeto de response, precisamos acessar a propriedade "originalEvent" e dentro da mesma, acessamos a propriedade "body"
    Assim teremos acesso ao objeto da resposta*/
    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo: anexo.nombre,
      //urlAnexo: anexo.url
      urlAnexo: (anexo.url as string).replace('\\', 'https://')
    });

    this.uploadEnProceso = false;
  }
  get nombreAnexo() {
    const nombre = this.formulario.get('anexo').value;
    if (nombre) {
      return nombre.substring(nombre.indexOf('_') + 1, nombre.length);
    }
    return '';
  }

  /*
    23.21. Tratando erro de upload
  */
  errorUpload(event) {
    this.toasty.error("Error al intentar enviar anexo!");

    this.uploadEnProceso = false;
  }

  /*
    23.24. Salvando e removendo anexo
  */
  eliminarAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }


}
