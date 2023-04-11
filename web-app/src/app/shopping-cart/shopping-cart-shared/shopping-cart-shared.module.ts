import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ShoppingCartResumeComponent } from './shopping-cart-resume/shopping-cart-resume.component';

@NgModule({
  declarations: [ShoppingCartResumeComponent],
  imports: [CommonModule, SharedModule],
  exports: [ShoppingCartResumeComponent],
})
export class ShoppingCartSharedModule {}
