import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ProductModel from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartLocalStorageId: string = 'cart';

  public cart: BehaviorSubject<ProductModel[]> = new BehaviorSubject<
    ProductModel[]
  >([]);
  public cart$ = this.cart.asObservable();

  constructor() {
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
    let cart = this.getCart();
    let newCart = cart;

    newCart.push(product);
    this.cart.next(newCart);
    localStorage.setItem(this.cartLocalStorageId, JSON.stringify(newCart));
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
}
