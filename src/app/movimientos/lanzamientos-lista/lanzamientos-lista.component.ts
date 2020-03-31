import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lanzamientos-lista',
  templateUrl: './lanzamientos-lista.component.html',
  styleUrls: ['./lanzamientos-lista.component.css']
})
export class LanzamientosListaComponent {

  @Input() listaLanzamientos: any;

}
