import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CompartidoModule } from './../compartido/compartido.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    CompartidoModule,
    SeguridadRoutingModule
  ]
})
/*
  19.3. Desafio: módulo de segurança e protótipo da tela de login
*/
export class SeguridadModule { }
