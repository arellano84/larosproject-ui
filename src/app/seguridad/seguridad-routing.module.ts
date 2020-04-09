import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

/*
  19.3. Desafio: módulo de segurança e protótipo da tela de login
*/
const routes: Routes = [
  {path: 'login', component: LoginFormComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
