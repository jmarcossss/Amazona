import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CartModule } from './cart/cart.module';
import { CreateOrderModule } from './create-order/create-order.module';

@NgModule({
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    SharedModule,
    CartModule,
    CreateOrderModule,
  ],
})
export class ShoppingCartModule {}
