import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-order-info-item',
  templateUrl: './create-order-info-item.component.html',
  styleUrls: ['./create-order-info-item.component.css'],
})
export class CreateOrderInfoItemComponent {
  @Input() label = '';
  @Input() actionLabel? = '';
  @Input() actionNavigation? = '/';
}
