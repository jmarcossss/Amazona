import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { OrderModule } from '../order/order.module';
import { ProfileModule } from '../profile/profile.module';
import { HomeBodyComponent } from './home-body/home-body.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, HomeBodyComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShoppingCartModule,
    OrderModule,
    ProfileModule,
    SharedModule,
  ],
})
export class HomeModule {}
