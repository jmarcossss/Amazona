import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ProductModel from '../models/product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartLocalStorageId: string = 'cart';

  public cart: BehaviorSubject<ProductModel[]> = new BehaviorSubject<
    ProductModel[]
  >([]);
  public cart$ = this.cart.asObservable();

  constructor(private router: Router) {
    this.getCart();
  }

  public getCart() {
    let cart = localStorage.getItem(this.cartLocalStorageId);
    let formattedCart: ProductModel[] = [];
    if (!!cart) {
      let parsedCart = JSON.parse(cart);

      parsedCart.forEach((item: any) => {
        formattedCart.push(new ProductModel(item));
      });
    }

    this.cart.next(formattedCart);
    return formattedCart;
  }

  public addProductToCart(product: ProductModel) {
    const cart = this.getCart();

    let updatedCart = cart;

    updatedCart.push(product);
    this.cart.next(updatedCart);
    localStorage.setItem(this.cartLocalStorageId, JSON.stringify(updatedCart));
  }

  public removeProductFromCart(id: string) {
    const cart = this.getCart();

    const indexToRemove = cart.findIndex(
      (item: ProductModel) => item.id === id
    );

    if (indexToRemove === -1) {
      return;
    }

    const newCart = [...cart];
    newCart.splice(indexToRemove, 1);

    this.cart.next(newCart);
    localStorage.setItem(this.cartLocalStorageId, JSON.stringify(newCart));
  }

  public finishOrder() {
    this.router.navigate(['/create-order']);
  }
}
