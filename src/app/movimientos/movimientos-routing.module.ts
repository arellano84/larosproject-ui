import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanzamientoRegistroComponent } from './lanzamiento-registro/lanzamiento-registro.component';
import { LanzamientosBusquedaComponent } from './lanzamientos-busqueda/lanzamientos-busqueda.component';

/*
  18.14. Criando um Routing Module para o módulo de funcionalidade
*/
const routes: Routes = [
  {path: 'movimientos', component: LanzamientosBusquedaComponent},
  {path: 'movimientos/nuevo', component: LanzamientoRegistroComponent},
  {path: 'movimientos/:codigo', component: LanzamientoRegistroComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
