import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from './../../seguridad/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PersonaService } from './../../personas/persona.service';
import { Persona, Contacto, Estado, Ciudad } from './../../core/model';

@Component({
  selector: 'app-personas-registro',
  templateUrl: './personas-registro.component.html',
  styleUrls: ['./personas-registro.component.css']
})
export class PersonasRegistroComponent implements OnInit {

  persona = new Persona();
  estados: any[]; // 24.4. Preenchendo Dropdown de estados
  /*
  contacto = new Contacto(); // 23.13. Criando o formulário de contato
  mostrandoFormularioContacto = false; // 23.12. Criando o diálogo de contato
  contactoIndex: number; // 23.16. Editando contato
*/
  constructor(
    private personaService: PersonaService,
    private errorHandlerService: ErrorHandlerService,
    private toasty: ToastyService,
    private route:ActivatedRoute,
    private router:Router,
    private title:Title,
    public authService:AuthService) { }

  ngOnInit(): void {
    console.log("PersonasRegistroComponent.ngOnInit()...");

    this.title.setTitle('Nueva Persona');
    const codigoPersona = this.route.snapshot.params['codigo'];
    if(codigoPersona) {
      this.title.setTitle(`Modificar Persona [${codigoPersona}]`);
      this.consultarPorCodigo(codigoPersona);
    }

    this.cargarEstados();
  }

  guardar(formMov: FormControl) {
    if(!this.esModificacion) {
      this.agregrar(formMov);
    } else {
      this.actualizar(formMov);
    }
  }

  /*
  17.21. Desafio: implementando o cadastro de pessoas
  */
 agregrar(formMov: FormControl) {
    console.log('-PersonasRegistroComponent.agregrar()- Agregando Persona...', this.persona);
    this.personaService.agregrar(this.persona)
    .then(perAgregada => {
      // this.grid.reset(); //Reseteando la tabla.
      console.log(`-PersonasRegistroComponent.agregrar - Persona Agregada:`, perAgregada);
      this.toasty.success(`Persona Guardada con Éxito.`);

      // formMov.reset();
      // this.persona = new Persona();
      // Consultamos la persona...
      this.router.navigate(['/personas', perAgregada.codigo]);
    }).catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

  /*
    18.15. Desafio: roteamento e edição de pessoas
  */
 actualizar(formPer: FormControl) {
    console.log('-PersonasRegistroComponent.actualizar().- Actualizando Persona...');
    this.personaService.actualizar(this.persona)
    .then(perModificada => {
      // this.grid.reset(); //Reseteando la tabla.
      this.persona = perModificada;
      console.log(`-PersonasRegistroComponent.actualizar() - Persona ${this.persona.nombre}.`);
      this.toasty.success(`Persona ${this.persona.nombre} Actualizado con Éxito.`);
    }).catch(error => {
      this.errorHandlerService.handle(error);
    });
  }
  consultarPorCodigo(codigo: number) {
    console.log('-PersonasRegistroComponent.consultarPorCodigo()- Consultado Persona...', codigo);

    this.personaService.consultarPorCodigo(codigo)
      .then(per => {
        this.persona = per;
        console.log('-PersonasRegistroComponent.consultarPorCodigo()- Consultado Persona:', JSON.stringify(this.persona));
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }
  get esModificacion() {
    return Boolean(this.persona.codigo);
  }
  nuevoPersona(formMov: FormControl) {
    formMov.reset();
    // Se agrega por un bug para limpiar el nuevo movimiento.
    setTimeout(function() {
        this.persona = new Persona();
    }.bind(this), 1);
    this.router.navigate(['personas/nuevo']);
  }

  cargarEstados() {
    this.personaService.consultarEstados()
    .then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nombre, value: uf.codigo }));
    })
    .catch(error => {
      this.errorHandlerService.handle(error);
    });
    /*this.estados = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];*/
  }

}
