import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasRegistroComponent } from './personas-registro/personas-registro.component';
import { PersonasBusquedaComponent } from './personas-busqueda/personas-busqueda.component';

/*
  18.15. Desafio: roteamento e edição de pessoase
*/
const routes: Routes = [
  {path: 'personas', component: PersonasBusquedaComponent},
  {path: 'personas/nuevo', component: PersonasRegistroComponent},
  {path: 'personas/:codigo', component: PersonasRegistroComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
