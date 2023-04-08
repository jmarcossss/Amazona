import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-product-item',
  templateUrl: './cart-product-item.component.html',
  styleUrls: ['./cart-product-item.component.css'],
})
export class CartProductItemComponent {
  quantity = 0;

  increment() {
    if (this.quantity < 5) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
