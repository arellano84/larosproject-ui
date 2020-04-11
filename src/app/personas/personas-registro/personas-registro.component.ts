import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from './../../seguridad/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PersonaService } from './../../personas/persona.service';
import { Persona } from './../../core/model';

@Component({
  selector: 'app-personas-registro',
  templateUrl: './personas-registro.component.html',
  styleUrls: ['./personas-registro.component.css']
})
export class PersonasRegistroComponent implements OnInit {

  persona = new Persona();

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

      //formMov.reset();
      //this.persona = new Persona();
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

}