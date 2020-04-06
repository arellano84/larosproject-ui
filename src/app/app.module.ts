import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localeEs from '@angular/common/locales/es';
import { Routes, RouterModule } from '@angular/router';

import {ToastyModule} from 'ng2-toasty';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { PersonasModule } from './personas/personas.module';

import { LanzamientosBusquedaComponent } from './movimientos/lanzamientos-busqueda/lanzamientos-busqueda.component';
import { PersonasRegistroComponent } from './personas/personas-registro/personas-registro.component';
import { PersonasBusquedaComponent } from './personas/personas-busqueda/personas-busqueda.component';
import { LanzamientoRegistroComponent } from './movimientos/lanzamiento-registro/lanzamiento-registro.component';

// 17.11. Alterando o locale da aplicação para pt-BR
registerLocaleData(localeEs);

// 18.2. Configurando rotas na aplicação
const routes: Routes = [
  {path: 'movimientos', component: LanzamientosBusquedaComponent},
  {path: 'movimientos/nuevo', component: LanzamientoRegistroComponent},
  {path: 'personas', component: PersonasBusquedaComponent},
  {path: 'personas/nuevo', component: PersonasRegistroComponent}
];

@NgModule({
  declarations: [
    AppComponent
    //BarraNavComponent
    // MensajesValidacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    RouterModule.forRoot(routes),

    ToastyModule.forRoot(),
    ConfirmDialogModule,

    CoreModule,
    MovimientosModule,
    PersonasModule
  ],
  exports: [

  ],
  providers: [
    ConfirmationService,
    //{ provide: LOCALE_ID, useValue: 'pt-BR' }
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
