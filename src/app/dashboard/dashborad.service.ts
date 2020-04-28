
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/operator/toPromise';
import * as moment from 'moment';
import { environment } from './../../environments/environment';


/*
  23.3. Criando o serviço da Dashboard
*/
@Injectable()
export class DashboardService {

  movimientosUrl: string;

  constructor(private httpClient: HttpClient) {
    this.movimientosUrl = `${environment.apiUrl}/movimientos/`;
  }

  /*3. Tratamento da resposta
  Como visto acima não utilizamos o método "json" do response.
  Como visto anteriormente isso não é mais necessário, visto que o response já é o nosso objeto de resposta.
  A única diferença, foi que precisamos fazer o cast para "Array", para garatirmos a tipagem do mesmo.
  Com isso podemos manter a mesma assinatura do método, o qual devolve uma Promise de Array*/

  movimientosPorCategoria(): Promise<Array<any>> {

    console.log('-DashboardService.movimientosPorCategoria()- Consultado Movimientos por Catégoria...');

    return this.httpClient.get(`${this.movimientosUrl}estadisticas/por-categoria`)
      .toPromise()
      // .then(response => response.json());
      .then(response => response as Array<any>);
  }

  movimientosPorDia(): Promise<Array<any>> {

    console.log('-DashboardService.movimientosPorDia()- Consultado Movimientos por Día...');

    return this.httpClient.get(`${this.movimientosUrl}estadisticas/por-dia`)
      .toPromise()
      .then(response => {
        const datos = response as Array<any>; // response.json();
        this.convertirStringsParaFechas(datos);

        return datos;
      });
  }

  private convertirStringsParaFechas(datos: Array<any>) {
    for (const dato of datos) {
      dato.dia = moment(dato.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
