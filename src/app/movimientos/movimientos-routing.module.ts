import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimientoRegistroComponent } from './movimientos-registro/movimientos-registro.component';
import { MovimientosBusquedaComponent } from './movimientos-busqueda/movimientos-busqueda.component';

/*
  18.14. Criando um Routing Module para o módulo de funcionalidade
*/
const routes: Routes = [
  {path: 'movimientos', component: MovimientosBusquedaComponent},
  {path: 'movimientos/nuevo', component: MovimientoRegistroComponent},
  {path: 'movimientos/:codigo', component: MovimientoRegistroComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
