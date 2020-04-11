import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

/*
  19.11. Interceptando chamadas HTTP para tratar a expiração do access token
*/
@Injectable()
export class SeguridadHttpInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.url.includes('/oauth/token') && this.authService.isAccessTokenInvalido()) {

        return from(this.authService.obtenerNuevoAccessToken())
            .pipe(
                mergeMap(() => {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    return next.handle(req);
                })
            );
        }

        return next.handle(req);
    }
}
