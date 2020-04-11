import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './../seguridad/auth.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
/*
  19.16. Implementando o logout
*/
export class LogoutService {

  tokenRevokeUrl: string; // http://localhost:8080/tokens/revoke

  constructor(
    public authService: AuthService,
    private httpClient: HttpClient) {
      this.tokenRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    }

    /*
      19.16. Implementando o logout
    */
    logout() {
      console.log(`-LogoutService.logout()- Logout...`);

      return this.httpClient.delete(`${this.tokenRevokeUrl}`, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limpiarAccessToken();
      });
    }
}
