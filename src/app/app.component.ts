import { Component } from '@angular/core';
import {ToastyConfig} from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // 17.9. Adicionando mensagem de sucesso com Angular Toasty
  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router
    ) {
    this.toastyConfig.theme = 'bootstrap';
  }

  /*
  19.3. Desafio: módulo de segurança e protótipo da tela de login
  */
  muestraBarraNavegacion() {
    return this.router.url !== '/login';
  }
}
