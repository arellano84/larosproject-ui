import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    console.log(`ErrorHandlerService.handle()...`);

    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if( // errorResponse instanceof Response && //TODO: No funciona esto...
              errorResponse.status >= 400
              && errorResponse.status < 500) {
      let errors;
      msg = 'Ocurrio um error al procesar la solicitud.';

      if(errorResponse.status == 403) {
        msg = 'Usted no tienen permisos para ejecutar esta acción.';
      }

      try {
        // msg = errorResponse.error[0].mensajeUsuario;
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;
      } catch (e) { }
      console.log(msg, errorResponse);
    } else {
      msg = `Error al procesar el servicio remoto. Intente nuevamente.`;
      console.log(msg, errorResponse);
    }

    this.toastyService.error(msg);
  }
}
