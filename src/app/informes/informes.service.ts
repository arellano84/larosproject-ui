import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from './../../environments/environment';

/*
  23.9. Exibindo o PDF para o usuário
*/
@Injectable({
  providedIn: 'root'
})
export class InformesService {

  movimientosUrl: string;

  constructor(private httpClient: HttpClient) {
    this.movimientosUrl = `${environment.apiUrl}/movimientos/`;
  }

  /*
    23.9. Exibindo o PDF para o usuário
  */
  informesMovimientosPorPersona(inicio: Date, fim: Date) {

    console.log('-InformesService.informesMovimientosPorPersona()- Consultado Movimientos por Persona...');

    // Para declarar os parâmetros
    let params = new HttpParams();

    params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fin', moment(fim).format('YYYY-MM-DD'));

    // Para a requisição
    return this.httpClient.get(`${this.movimientosUrl}informes/por-persona`,
        { params, responseType: 'blob' })
        .toPromise()
        .then(response => response);
  }

}
