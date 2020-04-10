import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../seguridad/auth.service';

@Component({
  selector: 'app-barra-nav',
  templateUrl: './barra-nav.component.html',
  styleUrls: ['./barra-nav.component.css']
})
export class BarraNavComponent implements OnInit {

  mostrandoMenu = false;
  // 19.3. Desafio: módulo de segurança e protótipo da tela de login
  @Input() muestraBarraNavegacion: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
