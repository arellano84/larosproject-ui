import { Component } from '@angular/core';
import {ToastyConfig} from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // 17.9. Adicionando mensagem de sucesso com Angular Toasty
  constructor(private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
  }

}
