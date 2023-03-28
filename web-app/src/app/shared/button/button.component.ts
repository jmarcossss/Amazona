import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: string = 'btn large';
  @Input() label: string = 'Button';
  @Input() funcButton: Function | undefined;


  onClick() {
    if (this.funcButton) {
      this.funcButton();
    }
  }

}


