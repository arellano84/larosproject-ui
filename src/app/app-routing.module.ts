import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaNoEncotradaComponent } from './core/pagina-no-encotrada.component';
import { PersonasRegistroComponent } from './personas/personas-registro/personas-registro.component';
import { PersonasBusquedaComponent } from './personas/personas-busqueda/personas-busqueda.component';

/*
  18.13. Refatorando as rotas para usar Routing Module
*/
// const routes: Routes = [];
const routes: Routes = [
  {path: '', redirectTo: 'movimientos', pathMatch: 'full'}, // prefix
  /*
  18.14. Criando um Routing Module para o módulo de funcionalidade
  {path: 'movimientos', component: MovimientosBusquedaComponent},
  {path: 'movimientos/nuevo', component: MovimientoRegistroComponent},
  {path: 'movimientos/:codigo', component: MovimientoRegistroComponent},*/
  /* {path: 'personas', component: PersonasBusquedaComponent},
  {path: 'personas/nuevo', component: PersonasRegistroComponent},
  {path: 'personas/:codigo', component: PersonasRegistroComponent},*/
  {path: 'pagina-no-encontrada', component: PaginaNoEncotradaComponent},
  {path: '**', redirectTo: 'pagina-no-encontrada'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
