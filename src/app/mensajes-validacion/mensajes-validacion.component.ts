import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mensajes-validacion',
  template: `
    <div>
      <p-message class="ui-message ui-corner-all ui-message-error"
        *ngIf="tieneError()">
        {{ texto }}</p-message>
    </div>
  `,
  styles: [`
    .ui-message-error {
      /*margin: 0;*/
      margin-top: 3px;
    }
  `]
})
export class MensajesValidacionComponent {
  @Input() control: FormControl;
  @Input() error: string;
  @Input() texto: string;

  tieneError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
