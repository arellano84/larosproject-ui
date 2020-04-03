import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  movimientosUrl = 'http://localhost:8080/lanzamientos/';


  constructor(private httpClient: HttpClient) { }


  consultar(filtro: MovimientoFiltro): Promise< any > {

    console.log('-MovimientoService.consultar - Consultado Movimientos...');

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    // const params = new URLSearchParams();
    let params = new HttpParams();
    // 17.3. Adicionando filtro por descrição na pesquisa de lançamentos
    if(filtro.descripcion) {
      params = params.set('descripcion', filtro.descripcion);
    }
    // 17.4. Adicionando filtro por datas na pesquisa de lançamentos
    if(filtro.fechaVencimientoDe) {
      params = params.set('fechaVencimientoDe', moment(filtro.fechaVencimientoDe).format('YYYY-MM-DD'));
    }
    if(filtro.fechaVencimientoHasta) {
      params = params.set('fechaVencimientoHasta', moment(filtro.fechaVencimientoHasta).format('YYYY-MM-DD'));
    }

    return this.httpClient
      .get(`${this.movimientosUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => response['content'])
      .catch(error => {
        console.log('-MovimientoService.consultar - error...' + error);
        return Promise.reject(`Error al Consultar Movimientos!`);
    });

  }

}

/*
Interface para definir contrato.
*/
export interface MovimientoFiltro {
  descripcion: string;
  fechaVencimientoDe: Date;
  fechaVencimientoHasta: Date;
}
