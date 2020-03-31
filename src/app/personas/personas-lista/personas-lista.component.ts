import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personas-lista',
  templateUrl: './personas-lista.component.html',
  styleUrls: ['./personas-lista.component.css']
})
export class PersonasListaComponent {

  @Input() listaPersonas: any;

}
