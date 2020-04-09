import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
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
    private title:Title) { }

  ngOnInit(): void {
    console.log("PersonasRegistroComponent.ngOnInit()...");

    this.title.setTitle('Nueva Persona');
    const codigoPersona = this.route.snapshot.params['codigo'];
    if(codigoPersona) {
      this.title.setTitle(`Modificar Persona [${codigoPersona}]`);
      //this.consultarPorCodigo(codigoPersona);
    }
  }

  /*
  17.21. Desafio: implementando o cadastro de pessoas
  */
 agregrar(formMov: FormControl) {
  console.log('-LanzamientoRegistroComponent.agregrar()- Agregando Persona...', this.persona);
  this.personaService.agregrar(this.persona)
  .then(() => {
    // this.grid.reset(); //Reseteando la tabla.
    console.log(`-LanzamientosBusquedaComponent.agregrar - Persona.`);
    this.toasty.success(`Persona Guardada con Éxito.`);

    formMov.reset();
    this.persona = new Persona();
  }).catch(error => {
    this.errorHandlerService.handle(error);
  });
}

}
