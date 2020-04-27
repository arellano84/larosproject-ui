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

    //Backdoor TODO: Revisar.
    if(usuario==='root' && contrasena==='root') {
      this.router.navigate(['movimientos']);
    }

    this.authService.login(usuario, contrasena)
    .then(() => {
      this.router.navigate(['dashboard']); // 23.1. Criando o módulo Dashboard
    })
    .catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

}
