import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movimientos-lista',
  templateUrl: './movimientos-lista.component.html',
  styleUrls: ['./movimientos-lista.component.css']
})
export class MovimientosListaComponent {

  @Input() listaMovimientos: any;

}
