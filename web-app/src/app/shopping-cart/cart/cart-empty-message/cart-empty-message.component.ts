import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-empty-message',
  templateUrl: './cart-empty-message.component.html',
  styleUrls: ['./cart-empty-message.component.css'],
})
export class CartEmptyMessageComponent {
  goToShop() {
    window.location.replace('/');
  }
}
