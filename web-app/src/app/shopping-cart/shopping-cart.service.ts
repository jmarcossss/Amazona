import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import ProductModel from '../models/product.model';
import OrderModel from '../models/order.model';
import { HttpService } from '../services/http.service';
import { RequestStatus } from '../shared/utils/request-status';
import { ErrorResponse } from '../shared/utils/response';
import { AuthenticationService } from '../authentication/authentication.service';

export interface CartItem {
  product: ProductModel;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private orderPrefix: string = '/orders';
  private cartLocalStorageId: string = 'cart';

  public cart: BehaviorSubject<ProductModel[]> = new BehaviorSubject<
    ProductModel[]
  >([]);
  public cart$ = this.cart.asObservable();

  public activeOrder: Partial<OrderModel> = {};

  public orderStatus: BehaviorSubject<RequestStatus<string, ErrorResponse>> =
    new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
      RequestStatus.idle()
    );
  public orderStatus$ = this.orderStatus.asObservable();

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {
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

  public clearCart() {
    this.cart.next([]);
    localStorage.removeItem(this.cartLocalStorageId);
  }

  public productQuantity(productId: string) {
    const cart = this.getCart();

    return cart.filter((product) => product.id === productId).length;
  }

  public tranformCartToShow(products: ProductModel[]) {
    let cart: CartItem[] = [];
    const productCounts: { [productId: string]: number } = {};

    products.forEach((product: ProductModel) => {
      productCounts[product.id] = (productCounts[product.id] || 0) + 1;
    });

    cart = Object.entries(productCounts).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId)!;
      return { product, quantity };
    });

    return cart.sort((a, b) => a.product.name.localeCompare(b.product.name));
  }

  public getActiveOrder() {
    let orderUser = this.authenticationService.getUser();
    if (!!orderUser) {
      let order: Partial<OrderModel> = {
        userId: orderUser.id,
        products: this.getCart(),
        address: orderUser.address[0],
        payment: orderUser.payment,
      };

      this.activeOrder = order;
    }

    return this.activeOrder;
  }

  public async createOrder(): Promise<void> {
    try {
      this.orderStatus.next(RequestStatus.loading());

      const activeOrder = this.activeOrder;

      let order = {
        userId: activeOrder.userId,
        productsIds: activeOrder?.products?.map((product) => product.id),
        totalValue: activeOrder?.products?.reduce((acc, product) => {
          return acc + parseInt(product.value);
        }, 0),
        purchaseDate: new Date(),
        address: activeOrder.address,
        payment: activeOrder.payment,
      };

      if (!order.address) {
        this.orderStatus.next(
          RequestStatus.failure(
            new ErrorResponse({
              msg: 'Por favor, defina um endereço de entrega!',
            })
          )
        );
        return;
      }

      const response = await firstValueFrom(
        this.httpService.post(`${this.orderPrefix}`, order)
      );

      response.handle({
        onSuccess: (_) => {
          this.orderStatus.next(RequestStatus.success(''));
          this.clearCart();
          this.activeOrder = {};
        },
        onFailure: (error) => {
          this.orderStatus.next(RequestStatus.failure(error));
        },
      });
    } catch (error) {
      this.orderStatus.next(RequestStatus.failure(error));
    } finally {
      this.orderStatus.next(RequestStatus.idle());
    }
  }
}
