import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-autorizado',
  template: `
    <div class="container">
      <h1 clas="text-center"> Acceso Denegado!</h1>
    </div>
  `,
  styles: [
  ],
})
/*
  19.13. Protegendo rotas com guarda de rotas (CanActivate)
*/
export class NoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
