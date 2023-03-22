import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { OrderModule } from '../order/order.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShoppingCartModule,
    OrderModule,
    ProfileModule,
  ],
})
export class HomeModule {}
