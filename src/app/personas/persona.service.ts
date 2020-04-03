import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personasUrl = 'http://localhost:8080/personas/';


  constructor(private httpClient: HttpClient) { }


  consultar(filtro: PersonaFiltro): Promise< any > {

    console.log('-PersonaService.consultar - Consultado Personas...');

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();
    // Filtro Nombre
    if(filtro.nombre) {
      params = params.set('nombre', filtro.nombre);
    }

    // Paginando
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.registrosPorPagina.toString());

    return this.httpClient
      .get(`${this.personasUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
          // response['content']
          const personas = response['content'];
          const resultado = {
            personas,
            total: response['totalElements']
          };

          console.log('-PersonaService.consultar- resultado:'+resultado);
          return resultado;
        })
      .catch(error => {
        console.log('-PersonaService.consultar - error:' + error);
        return Promise.reject(`Error al Consultar Personas!`);
    });

  }

  consultarTodos(): Promise< any > {
    console.log('-PersonaService.consultarTodos - Consultado Todas Personas...');

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.httpClient
      .get(`${this.personasUrl}?resumo`, { headers })
      .toPromise()
      .then(response => response['content'])
      .catch(error => {
        console.log('-PersonaService.consultarTodos - error:' + error);
        return Promise.reject(`Error al Consultar Todas Personas!`);
    });
  }



  /*
  agregrar(ciudad: any): Promise<any> {
    return this.httpClient
      .post('http://localhost:3000/ciudades', ciudad)
      .toPromise();
  }

  eliminar(id: number): Promise<any> {
    return this.httpClient.delete(`http://localhost:3000/ciudades/${id}`)
    .toPromise()
    .then(() => null);
  }

  actualizar(ciudad: any): Promise<any> {
    return this.httpClient.put(`http://localhost:3000/ciudades/${ciudad.id}`, ciudad)
    .toPromise()
    .catch(error => {
        console.log('-Servicio- actualizar error...' + error);
        return Promise.reject(`Error al actualizar la ciudad ${ciudad.id}`);
    });
    // .then(response => response.json());
  }
  */

}

/*
Interface para definir contrato.
*/
export class PersonaFiltro {
  nombre: string;
  pagina = 0;
  registrosPorPagina = 3;
}
