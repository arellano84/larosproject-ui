import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../seguridad/auth.guard';
import { InformeMovimientosComponent } from './informe-movimientos/informe-movimientos.component';

/*
  23.7. Criando módulo de relatórios
*/
const routes: Routes = [
  {
    path: 'informes', // TODO: verificar porque en ejemplo esta como "lanzamientos"
    component: InformeMovimientosComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
