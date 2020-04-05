import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias/';


  constructor(private httpClient: HttpClient) { }

  consultarTodos(): Promise< any > {
    console.log('-CategoriaService.consultarTodos- Consultado Todas Categoris...');

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.httpClient
      .get(`${this.categoriasUrl}`, { headers })
      .toPromise()
      .then(response => response);//['content']
  }
}
