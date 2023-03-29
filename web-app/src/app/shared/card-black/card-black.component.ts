import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-black',
  templateUrl: './card-black.component.html',
  styleUrls: ['./card-black.component.css']
})

export class CardBlackComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() author: string = '';
  @Input() date: string = '';
}
