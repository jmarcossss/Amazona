import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductItemComponent } from './cart-product-item/cart-product-item.component';
import { SharedModule } from '../../shared/shared.module';
import { CartComponent } from './cart.component';
import { CartEmptyMessageComponent } from './cart-empty-message/cart-empty-message.component';
import { ShoppingCartSharedModule } from '../shopping-cart-shared/shopping-cart-shared.module';

@NgModule({
  declarations: [
    CartComponent,
    CartProductItemComponent,
    CartEmptyMessageComponent,
  ],
  imports: [CommonModule, SharedModule, ShoppingCartSharedModule],
})
export class CartModule {}
