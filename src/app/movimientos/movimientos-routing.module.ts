import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../seguridad/auth.guard';
import { MovimientoRegistroComponent } from './movimientos-registro/movimientos-registro.component';
import { MovimientosBusquedaComponent } from './movimientos-busqueda/movimientos-busqueda.component';

/*
  18.14. Criando um Routing Module para o módulo de funcionalidade
*/
const routes: Routes = [
  {
    path: 'movimientos',
    component: MovimientosBusquedaComponent,
    canActivate: [AuthGuard], // 19.13. Protegendo rotas com guarda de rotas (CanActivate)
    data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  },
  {
    path: 'movimientos/nuevo',
    component: MovimientoRegistroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  },
  {
    path: 'movimientos/:codigo',
    component: MovimientoRegistroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
