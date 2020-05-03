import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Persona, Estado, Ciudad } from './../core/model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personasUrl: string; // http://localhost:8080/personas/
  ciudadesUrl: string; // 24.3. Buscando estados e cidades
  estadosUrl: string;

  constructor(private httpClient: HttpClient) {
    this.personasUrl = `${environment.apiUrl}/personas/`;
    this.ciudadesUrl = `${environment.apiUrl}/ciudades/`;
    this.estadosUrl = `${environment.apiUrl}/estados/`;
  }


  consultar(filtro: PersonaFiltro): Promise< any > {

    console.log('-PersonaService.consultar - Consultado Personas...');

    const headers = new HttpHeaders();
    // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

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

    const headers = new HttpHeaders();
    //.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
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

    const headers = new HttpHeaders();
    // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.httpClient.delete(`${this.personasUrl}${codigo}`, { headers })
    .toPromise()
    .then(() => null);
  }

  actualizarEstado(codigo: number, activo: boolean): Promise<any> {
    console.log(`-PersonaService.atualizarEstado()- Actualizando estado Personas Codigo:${codigo}, Activo:${activo}`);

    const headers = new HttpHeaders()
    // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json'); // 25.10. Corrigindo o link de mudança de status

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
                  // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
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
                  // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
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

    const headers = new HttpHeaders();
    // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.httpClient
      .get(`${this.personasUrl}${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const persona = response as Persona;
        console.log('-PersonaService.consultarPorCodigo()- Consultado Persona:', persona);
        return persona;
      });
  }

  /*
    24.3. Buscando estados e cidades
  */
  consultarEstados(): Promise< Estado[] > {
    console.log('-PersonaService.consultarEstados()- Consultado Estados...');

    return this.httpClient
      .get(`${this.estadosUrl}`)
      .toPromise()
      .then(response => response as Estado[]);
      /*.then(response => {
        const estado = response as Estado[];
        console.log('-PersonaService.consultarEstados()- Consultado Estados:', estado);
        return estado;
      });*/
  }
  consultarCiudades(estado): Promise< Ciudad[] > {
    console.log('-PersonaService.consultarCiudades()- Consultado Ciudades...');
    // Lembrando que, pelo fato de ser imutável, é necessário reatribuir o valor sempre que um método que altere seu estado for invocado
    let params = new HttpParams();
    params = params.set('estado', estado)

    return this.httpClient
      .get(`${this.ciudadesUrl}`, {params})
      .toPromise()
      .then(response => response as Ciudad[]);
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
