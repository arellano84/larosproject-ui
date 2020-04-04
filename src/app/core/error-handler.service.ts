import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;

    if(typeof errorResponse == 'string') {
      msg = errorResponse;
    } else {
      msg = `Error al procesar el servicio remoto. Intente nuevamente.`;
      console.log(msg, errorResponse);
    }

    this.toastyService.error(msg);
  }
}
