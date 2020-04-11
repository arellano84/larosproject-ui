import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
/*
  19.13. Protegendo rotas com guarda de rotas (CanActivate)
*/
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('-AuthGuard.canActivate()-', next.data.roles);

      // 19.15. Tratando acessos de usuários deslogados na AuthGuard
      if(this.authService.isAccessTokenInvalido()) {
        console.log('-AuthGuard.canActivate()- Navegación con AccessToken Invalido. Obteniendo nuevo token...');
        this.authService.obtenerNuevoAccessToken()
          .then(() => {
            if(this.authService.isAccessTokenInvalido()) {
              this.router.navigate(['/login']);
              return false;
            }
            return true;
          });
      // 19.13. Protegendo rotas com guarda de rotas (CanActivate)
      } else if(next.data.roles && !this.authService.tieneCualquierPermiso(next.data.roles)) {
        this.router.navigate(['no-autorizado']);
        return false;
      }
      return true;
  }

}
