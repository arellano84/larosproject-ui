import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localeEs from '@angular/common/locales/es';
import localeEsMX from '@angular/common/locales/es-MX';
import { Routes, RouterModule } from '@angular/router';

import {ToastyModule} from 'ng2-toasty';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { PersonasModule } from './personas/personas.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SeguridadModule } from './seguridad/seguridad.module';

// 17.11. Alterando o locale da aplicação para pt-BR
// 21.2. Corrigindo problemas com Locale
registerLocaleData(localeEs);

// 18.2. Configurando rotas na aplicação
/*
18.13. Refatorando as rotas para usar Routing Module
const routes: Routes = [
  {path: '', redirectTo: 'movimientos', pathMatch: 'full'}, // prefix
  {path: 'movimientos', component: MovimientosBusquedaComponent},
  {path: 'movimientos/nuevo', component: MovimientoRegistroComponent},
  {path: 'movimientos/:codigo', component: MovimientoRegistroComponent},
  {path: 'personas', component: PersonasBusquedaComponent},
  {path: 'personas/nuevo', component: PersonasRegistroComponent},
  {path: 'personas/:codigo', component: PersonasRegistroComponent},
  {path: 'pagina-no-encontrada', component: PaginaNoEncotradaComponent},
  {path: '**', redirectTo: 'pagina-no-encontrada'}
];*/

@NgModule({
  declarations: [
    AppComponent
    //BarraNavComponent
    // MensajesValidacionComponent
  ],
  imports: [
    BrowserModule,

    // RouterModule.forRoot(routes),
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    CoreModule,
    DashboardModule, // 23.1. Criando o módulo Dashboard
    MovimientosModule,
    PersonasModule,
    SeguridadModule,

    /*Está escrito no manual do Angular que os módulos que importam rotas child (LancamentosModule)
    devem estar (no Array de imports de app.module.ts) antes da importação de AppRoutingModule,
    então não é que tenha que ser o último, mas de acordo com esta aula,
     bastaria colocar AppRoutingModule depois de LancamentosModule.*/
    AppRoutingModule // Debe estar siempre al final
  ],
  exports: [

  ],
  providers: [
    ConfirmationService,
    //{ provide: LOCALE_ID, useValue: 'pt-BR' }
    { provide: LOCALE_ID, useValue: 'es' } //es-ES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
