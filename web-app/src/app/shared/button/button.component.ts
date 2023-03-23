import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: string = 'btn large'
  @Input() label: string = 'Button';

   onClick() {
    console.log('Button clicked!');
  }

}
