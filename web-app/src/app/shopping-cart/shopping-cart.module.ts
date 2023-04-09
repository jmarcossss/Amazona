import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';
import { SharedModule } from '../shared/shared.module';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [CreateOrderComponent],
  imports: [CommonModule, ShoppingCartRoutingModule, SharedModule, CartModule],
})
export class ShoppingCartModule {}
