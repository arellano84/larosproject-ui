import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
/*
  19.3. Desafio: módulo de segurança e protótipo da tela de login
*/
export class LoginFormComponent implements OnInit {

  constructor(
    private router:Router,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit(): void {
  }

  login(usuario: string, contrasena: string) {
    console.log("-LoginFormComponent.login()- Login...");

    this.authService.login(usuario, contrasena)
    .then(() => {
      this.router.navigate(['movimientos']);
    })
    .catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

}
