import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
/*
  19.3. Desafio: módulo de segurança e protótipo da tela de login
*/
export class LoginFormComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['movimientos']);
  }

}
