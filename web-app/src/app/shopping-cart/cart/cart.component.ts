import { Component, OnInit } from '@angular/core';
import { CartItem, ShoppingCartService } from '../shopping-cart.service';
import ProductModel from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cart: CartItem[] = [];

  constructor(
    public shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.cart$.subscribe((cart) => {
      this.cart = this.shoppingCartService.tranformCartToShow(cart);
    });
  }

  goToOrder() {
    this.router.navigate(['/shopping-cart/create-order']);
  }
}
