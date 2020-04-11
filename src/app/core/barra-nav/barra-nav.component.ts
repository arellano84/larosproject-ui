import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../seguridad/auth.service';
import { LogoutService } from './../../seguridad/logout.service';
import { ErrorHandlerService } from './../error-handler.service';

@Component({
  selector: 'app-barra-nav',
  templateUrl: './barra-nav.component.html',
  styleUrls: ['./barra-nav.component.css']
})
export class BarraNavComponent implements OnInit {

  mostrandoMenu = false;
  // 19.3. Desafio: módulo de segurança e protótipo da tela de login
  @Input() muestraBarraNavegacion: boolean;

  constructor(
    public authService: AuthService,
    public logoutService: LogoutService,
    private errorHandlerService: ErrorHandlerService,
    private router:Router) { }

  ngOnInit(): void {
  }

  /*
    19.10. Obtendo um novo access token
  */
  /*
  renovarAccessToken() {
    this.authService.obtenerNuevoAccessToken();
  }
  */

  /*
    19.16. Implementando o logout
  */
  logout() {
    console.log(`-BarraNavComponent.logout()- Logout...`);
    this.logoutService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(error =>  this.errorHandlerService.handle(error));
  }

}
