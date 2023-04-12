import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart.service';
import ProductModel from '../../../models/product.model';
import { currencyFormatterBR } from '../../../shared/utils/currency-formatter';

@Component({
  selector: 'app-cart-product-item',
  templateUrl: './cart-product-item.component.html',
  styleUrls: ['./cart-product-item.component.css'],
})
export class CartProductItemComponent implements OnInit {
  @Input() product!: ProductModel;
  @Input() quantity = 0;
  formattedPrice = '';
  formattedTotalPrice = '';

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.formattedPrice = currencyFormatterBR(parseInt(this.product.value));
    this.formattedTotalPrice = currencyFormatterBR(
      parseInt(this.product.value) * this.quantity
    );
  }

  increment() {
    this.quantity++;
    this.shoppingCartService.addProductToCart(this.product);
  }

  decrement() {
    if (this.quantity > 0) {
      this.quantity--;
      this.shoppingCartService.removeProductFromCart(this.product.id);
    }
  }
}
