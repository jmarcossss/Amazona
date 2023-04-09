import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductItemComponent } from './cart-product-item/cart-product-item.component';
import { SharedModule } from '../../shared/shared.module';
import { CartComponent } from './cart.component';
import { CartResumeComponent } from './cart-resume/cart-resume.component';
import { CartEmptyMessageComponent } from './cart-empty-message/cart-empty-message.component';

@NgModule({
  declarations: [
    CartComponent,
    CartProductItemComponent,
    CartResumeComponent,
    CartEmptyMessageComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class CartModule {}
