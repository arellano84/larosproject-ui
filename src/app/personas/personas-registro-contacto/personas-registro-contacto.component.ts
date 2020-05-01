import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contacto } from './../../core/model';

/*
  23.18. Criando componente de contatos
*/
@Component({
  selector: 'app-personas-registro-contacto',
  templateUrl: './personas-registro-contacto.component.html',
  styleUrls: ['./personas-registro-contacto.component.css']
})
export class PersonasRegistroContactoComponent implements OnInit {

  @Input() contactos: Array<Contacto>;
  //contacto: Contacto;
  contacto = new Contacto(); // 23.13. Criando o formulário de contato
  mostrandoFormularioContacto = false; // 23.12. Criando o diálogo de contato
  contactoIndex: number; // 23.16. Editando contato

  constructor() { }

  ngOnInit(): void {
  }


  /*
    23.12. Criando o diálogo de contato
  */
  prepararNuevoContacto() {
    this.mostrandoFormularioContacto = true;
    this.contacto = new Contacto();
    this.contactoIndex = this.contactos.length;
  }


  /*
    23.14. Incluindo um novo contato
  */
  confirmarContacto(frmContacto: FormControl) {

    console.log('-PersonasRegistroComponent.confirmarContacto()- Confirmar Contacto...', this.contacto);

    //this.persona.contactos.push(this.clonarContacto(this.contacto));
    this.contactos[this.contactoIndex] = this.clonarContacto(this.contacto); // 23.16. Editando contato

    this.mostrandoFormularioContacto = false;

    frmContacto.reset();
  }

  /*
    Clonamos Contacto para poder resetear formulario.
  */
  clonarContacto(contacto: Contacto) {
    return new Contacto(
      contacto.codigo, contacto.nombre,
      contacto.email, contacto.telefono);
  }

  /*
    23.16. Editando contato
  */
  prepararEdicionContacto(contacto: Contacto, index: number) {

    console.log(`-PersonasRegistroComponent.prepararEdicionContacto()- index ${index}.`);

    this.contacto = this.clonarContacto(contacto);
    this.mostrandoFormularioContacto = true;
    this.contactoIndex = index;
  }

  /*
    23.17. Removendo contato
  */
  eliminarContacto(index: number) {
    console.log(`-PersonasRegistroComponent.eliminarContacto()- index ${index}.`);

    this.contactos.splice(index, 1);
  }

  get esModificacion() {
    return this.contacto && this.contacto.codigo;
  }

}
