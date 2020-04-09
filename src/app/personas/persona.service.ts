import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Persona } from './../core/model';

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

  actualizarEstado(codigo: number, activo: boolean): Promise<any> {
    console.log(`-PersonaService.atualizarEstado()- Actualizando estado Personas Codigo:${codigo}, Activo:${activo}`);

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return this.httpClient.put(`${this.personasUrl}${codigo}/activo`, activo, { headers })
                          .toPromise()
                          .then(() => null);
  }

  /*
  17.21. Desafio: implementando o cadastro de pessoas
  */
  agregrar(persona: Persona): Promise<Persona> {
    console.log(`-PersonaService.agregrar() - Agregando Personas`);

    const headers = new HttpHeaders()
                  .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
                  .append('Content-Type', 'application/json');
    return this.httpClient
      .post(`${this.personasUrl}`, JSON.stringify(persona), { headers })
      .toPromise()
      .then(response => {
        const perAgregada = response as Persona;
        console.log('-PersonaService.agregrar()- Agregar Persona:', perAgregada);
        return perAgregada;
      });
  }

  /*
    18.15. Desafio: roteamento e edição de pessoas
  */
  actualizar(persona: Persona): Promise<Persona> {
    console.log(`-PersonaService.actualizar()- Actualizar Persona..`);

    const headers = new HttpHeaders()
                  .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
                  .append('Content-Type', 'application/json');
    return this.httpClient.put(`${this.personasUrl}${persona.codigo}`, JSON.stringify(persona), { headers })
    .toPromise()
    .then(response => {
      const perModificada = response as Persona;
      console.log('-PersonaService.actualizar()- Actualizar Persona:', perModificada);
      return perModificada;
    });
  }

  consultarPorCodigo(codigo: number): Promise< Persona > {
    console.log('-PersonaService.consultarPorCodigo()- Consultado Persona...');

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.httpClient
      .get(`${this.personasUrl}${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const persona = response as Persona;
        console.log('-PersonaService.consultarPorCodigo()- Consultado Persona:', persona);
        return persona;
      });
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
