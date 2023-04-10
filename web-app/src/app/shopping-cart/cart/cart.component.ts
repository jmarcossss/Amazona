import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import ProductModel from '../../models/product.model';

interface CarItem {
  product: ProductModel;
  quantity: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cart: CarItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.cart$.subscribe((cart) => {
      this.tranformCartToShow(cart);
    });
  }

  tranformCartToShow(products: ProductModel[]) {
    const productCounts: { [productId: string]: number } = {};

    products.forEach((product: ProductModel) => {
      productCounts[product.id] = (productCounts[product.id] || 0) + 1;
    });

    this.cart = Object.entries(productCounts).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId)!;
      return { product, quantity };
    });

    this.cart.sort((a, b) => a.product.name.localeCompare(b.product.name));
  }
}
