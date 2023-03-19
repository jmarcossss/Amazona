import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CreateOrderComponent } from './create-order/create-order.component';

@NgModule({
  imports: [CommonModule, ShoppingCartRoutingModule],
  declarations: [
    CartComponent,
    CreateOrderComponent
  ],
})
export class ShoppingCartModule {}
