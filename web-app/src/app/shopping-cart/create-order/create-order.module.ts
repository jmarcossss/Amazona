import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './create-order.component';
import { CreateOrderInfoItemComponent } from './create-order-info-item/create-order-info-item.component';
import { SharedModule } from '../../shared/shared.module';
import { ShoppingCartSharedModule } from '../shopping-cart-shared/shopping-cart-shared.module';

@NgModule({
  declarations: [CreateOrderComponent, CreateOrderInfoItemComponent],
  imports: [CommonModule, SharedModule, ShoppingCartSharedModule],
})
export class CreateOrderModule {}
