import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../seguridad/auth.guard';
import { PersonasRegistroComponent } from './personas-registro/personas-registro.component';
import { PersonasBusquedaComponent } from './personas-busqueda/personas-busqueda.component';

/*
  18.15. Desafio: roteamento e edição de pessoase
*/
const routes: Routes = [
  {
    path: 'personas', component: PersonasBusquedaComponent,
    canActivate: [AuthGuard], // 19.13. Protegendo rotas com guarda de rotas (CanActivate)
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}
  },
  {
    path: 'personas/nuevo',
    component: PersonasRegistroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_PESSOA']}
  },
  {
    path: 'personas/:codigo',
    component: PersonasRegistroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
