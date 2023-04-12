import { Component, Input, SimpleChanges } from '@angular/core';
import ProductModel from '../../../models/product.model';
import { currencyFormatterBR } from '../../../shared/utils/currency-formatter';

@Component({
  selector: 'app-shopping-cart-resume',
  templateUrl: './shopping-cart-resume.component.html',
  styleUrls: ['./shopping-cart-resume.component.css'],
})
export class ShoppingCartResumeComponent {
  @Input() products: ProductModel[] = [];
  subTotal = '';
  shipping = '';
  discount = '';
  total = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']?.currentValue) {
      this.calc();
    }
  }

  ngOnInit(): void {
    this.calc();
  }

  calc() {
    this.subTotal = currencyFormatterBR(this.calculateSubTotal(this.products));
    this.shipping = currencyFormatterBR(this.calculateShipping());
    this.discount = currencyFormatterBR(this.calculateDiscount());
    this.total = currencyFormatterBR(this.calculateTotal(this.products));
  }

  calculateSubTotal(products: ProductModel[]) {
    return products.reduce(
      (total, product) => total + parseInt(product.value),
      0
    );
  }

  calculateShipping() {
    return 0;
  }

  calculateDiscount() {
    return 0;
  }

  calculateTotal(products: ProductModel[]) {
    return (
      this.calculateSubTotal(products) +
      this.calculateShipping() -
      this.calculateDiscount()
    );
  }
}
