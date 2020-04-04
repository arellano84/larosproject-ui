import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ToastyModule} from 'ng2-toasty';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { PersonasModule } from './personas/personas.module';


@NgModule({
  declarations: [
    AppComponent
    //BarraNavComponent
    // MensajesValidacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ToastyModule.forRoot(),

    CoreModule,
    MovimientosModule,
    PersonasModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
