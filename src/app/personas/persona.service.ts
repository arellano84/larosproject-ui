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
    console.log('-PersonaService.consultarTodos- Consultado Todas Personas...');

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.httpClient
      .get(`${this.personasUrl}?resumo`, { headers })
      .toPromise()
      .then(response => response['content'])
      .catch(error => {
        console.log('-PersonaService.consultar - error:' + error);
        return Promise.reject(`Error al Consultar Personas!`);
    });
  }

  eliminar(codigo: number): Promise<any> {

    console.log(`-PersonaService.consultarTodos- Eliminando Personas ${codigo}`);

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.httpClient.delete(`${this.personasUrl}${codigo}`, { headers })
    .toPromise()
    .then(() => null);
  }

  actualizarEstado(persona: any): Promise<any> {
    console.log(`-PersonaService.atualizarEstado()- Actualizando estado Personas ${persona.codigo}`);

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.httpClient.put(`${this.personasUrl}${persona.codigo}/activo`,
                              persona.activo?false:true,
                              { headers })
    .toPromise()
    .then(() => null);
  }

}

/*
Interface para definir contrato.
*/
export class PersonaFiltro {
  nombre: string;
  pagina = 0;
  registrosPorPagina = 3;
}
