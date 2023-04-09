import { Component } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart.service';
import { currencyFormatterBR } from '../../../shared/utils/currency-formatter';
import ProductModel from '../../../models/product.model';
@Component({
  selector: 'app-cart-resume',
  templateUrl: './cart-resume.component.html',
  styleUrls: ['./cart-resume.component.css'],
})
export class CartResumeComponent {
  subTotal = '';
  shipping = '';
  discount = '';
  total = '';

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.cart$.subscribe((cart) => {
      this.subTotal = currencyFormatterBR(this.calculateSubTotal(cart));
      this.shipping = currencyFormatterBR(this.calculateShipping());
      this.discount = currencyFormatterBR(this.calculateDiscount());
      this.total = currencyFormatterBR(this.calculateTotal(cart));
    });
  }

  calculateSubTotal(cart: ProductModel[]) {
    return cart.reduce((total, product) => total + parseInt(product.value), 0);
  }

  calculateShipping() {
    return 0;
  }

  calculateDiscount() {
    return 0;
  }

  calculateTotal(cart: ProductModel[]) {
    return (
      this.calculateSubTotal(cart) +
      this.calculateShipping() -
      this.calculateDiscount()
    );
  }

  finishOrder() {}
}
