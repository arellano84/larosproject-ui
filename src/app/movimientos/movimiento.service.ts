import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  movimientosUrl = 'http://localhost:8080/lanzamientos/';

  constructor(private httpClient: HttpClient) { }

  consultar(): Promise< any > {
    console.log('-MovimientoService.consultar - Consultado Movimientos...');

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.httpClient
      .get(`${this.movimientosUrl}?resumo`, { headers })
      .toPromise()
      .then(response => response['content'])
      .catch(error => {
        console.log('-MovimientoService.consultar - error...' + error);
        return Promise.reject(`Error al Consultar Movimientos!`);
    });

  }

}
