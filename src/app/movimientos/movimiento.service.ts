import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Movimiento } from './../core/model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  movimientosUrl = 'http://localhost:8080/lanzamientos/';


  constructor(private httpClient: HttpClient) { }


  consultar(filtro: MovimientoFiltro): Promise< any > {

    console.log('-MovimientoService.consultar()- Consultado Movimientos...');

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

    // 17.5. Implementando a paginação no serviço de lançamentos
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.registrosPorPagina.toString());

    return this.httpClient
      .get(`${this.movimientosUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
          // response['content']
          const movimientos = response['content']
          const resultado = {
            movimientos,
            total: response['totalElements']
          };
          return resultado;
        })
      .catch(error => {
        console.log('-MovimientoService.consultar - error...' + error);
        return Promise.reject(`Error al Consultar Movimientos!`);
    });

  }

  eliminar(codigo: number): Promise<any> {

    console.log(`-MovimientoService.eliminar()- Eliminando Movimientos ${codigo}`);

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.httpClient.delete(`${this.movimientosUrl}${codigo}`, { headers })
    .toPromise()
    .then(() => null);
  }

  /*
    17.20. Implementando o serviço de cadastro de lançamentos
  */
  agregrar(movimiento: Movimiento): Promise<Movimiento> {
    console.log(`-MovimientoService.agregrar() - Agregando Movimientos`);

    const headers = new HttpHeaders()
                  .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
                  .append('Content-Type', 'application/json');
    return this.httpClient
      .post(`${this.movimientosUrl}`, JSON.stringify(movimiento), { headers })
      .toPromise()
      .then(() => null);
  }

  /*
    18.6. Desafio: implementando os serviços de atualização e busca por código
  */
  actualizar(movimiento: Movimiento): Promise<Movimiento> {
    console.log(`-MovimientoService.actualizar()- Actualizar Movimiento..`);

    const headers = new HttpHeaders()
                  .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
                  .append('Content-Type', 'application/json');
    return this.httpClient.put(`${this.movimientosUrl}${movimiento.codigo}`, JSON.stringify(movimiento), { headers })
    .toPromise()
    .then(response => {
      const movimiento = response as Movimiento;
      this.convetirStringAData([movimiento]);
      console.log('-MovimientoService.actualizar()- Actualizar Movimiento:', movimiento);
      return movimiento;
    });
  }

  consultarPorCodigo(codigo: number): Promise< Movimiento > {

    console.log('-MovimientoService.consultarPorCodigo()- Consultado Movimiento...');

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.httpClient
      .get(`${this.movimientosUrl}${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const movimiento = response as Movimiento;
        this.convetirStringAData([movimiento]);
        console.log('-MovimientoService.consultarPorCodigo()- Consultado Movimiento:', movimiento);
        return movimiento;
      });
  }

  private convetirStringAData(movimientos: Movimiento[]) {

    for (const movimiento of movimientos) {
      movimiento.fechaVencimiento = moment(movimiento.fechaVencimiento,'YYYY-MM-DD').toDate();
      if (movimiento.fechaPago) {
        movimiento.fechaPago = moment(movimiento.fechaPago,'YYYY-MM-DD').toDate();
      }
    }
  }

}

/*
Interface para definir contrato.
*/
export class MovimientoFiltro {
  descripcion: string;
  fechaVencimientoDe: Date;
  fechaVencimientoHasta: Date;
  pagina = 0;
  registrosPorPagina = 3;
}
