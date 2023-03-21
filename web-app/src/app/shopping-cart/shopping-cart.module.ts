import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, ShoppingCartRoutingModule, SharedModule],
  declarations: [CartComponent, CreateOrderComponent],
})
export class ShoppingCartModule {}
