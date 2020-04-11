import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { stringify } from 'querystring';
import { NotAuthenticatedError } from './../seguridad/seguridad-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService,
    private router: Router) { }

  handle(errorResponse: any) {
    console.log(`ErrorHandlerService.handle()...`);

    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if(errorResponse instanceof NotAuthenticatedError) { // TODO: revisar, no funciona.
      // 19.14. E se o Refresh Token expirar?
      msg = 'La sesión ha expirado.';
      this.router.navigate(['/login']);
    } else if( // errorResponse instanceof HttpErrorResponse //TODO: verificar si ya funciona.
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
