import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
/*
  19.4. Implementando o serviço de autenticação com OAuth 2
*/
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  // 19.5. Decodificando o JWT e armazenando no Local Storage
  jwtPayload: any;

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService) {

      // 19.5. Decodificando o JWT e armazenando no Local Storage
      this.cargarToken();
    }

  login(usuario: string, contrasena: string): Promise<void> {
    console.log('-AuthService.login()- Login...', usuario);

    const headers = new HttpHeaders()
                    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
                    .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${contrasena}&grant_type=password`; // &client=angular

    return this.httpClient
    .post(`${this.oauthTokenUrl}`, body, { headers })
    .toPromise()
    .then(response => {
      this.almacenarToken(response['access_token']);
      console.log('-AuthService.login()- jwt ', JSON.stringify(this.jwtPayload));
    })
    .catch(response => {
      console.log('-AuthService.login()- Error:', JSON.stringify(response));
      if (response.status === 400) {
        if (response.error.error === 'invalid_grant') {
          const mensaje = 'Usuario y/o Contraseña Inválida';
          console.log('-AuthService.login()- Error:', mensaje);

          return Promise.reject(mensaje);
        }
      }
      return Promise.reject(response);
    });
  }

  /*
    19.5. Decodificando o JWT e armazenando no Local Storage
  */
  private almacenarToken(token: string) {
    console.log('-AuthService.almacenarToken()- Inicio ');
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    //almacena los datos del token en el navegador.
    localStorage.setItem('token', token);
  }

  /*
    19.5. Decodificando o JWT e armazenando no Local Storage
  */
  cargarToken() {
    console.log('-AuthService.cargarToken()- Inicio ');
    const token= localStorage.getItem('token');
    if(token) {
      this.almacenarToken(token);
    }
  }

}
