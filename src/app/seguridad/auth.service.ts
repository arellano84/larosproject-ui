import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/*
  19.4. Implementando o serviço de autenticação com OAuth 2
*/
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(private httpClient: HttpClient) { }

  login(usuario: string, contrasena: string): Promise<void> {
    console.log('-AuthService.login() - Login...', usuario);

    const headers = new HttpHeaders()
                    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
                    .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${contrasena}&grant_type=password`; // &client=angular

    return this.httpClient
    .post(`${this.oauthTokenUrl}`, body, { headers })
    .toPromise()
    .then(response => {
      console.log('-AuthService.login() - Respuesta:', response);
    })
    .catch(response => {
      console.log('-AuthService.login() - Error:', response);
    });
  }

}
