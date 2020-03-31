
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BarraNavComponent } from './barra-nav/barra-nav.component';

import { MovimientosModule } from './movimientos/movimientos.module';
import { PersonasModule } from './personas/personas.module';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavComponent
    // MensajesValidacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MovimientosModule,
    PersonasModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
