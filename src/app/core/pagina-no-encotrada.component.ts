import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-no-encotrada',
  template: `
    <div class="container">
      <h1 clas="text-center"> Página no encontrada.</h1>
    </div>
  `,
  styles: [
  ],
})
/*
18.11. Tratando rota não encontrada
*/
export class PaginaNoEncotradaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
