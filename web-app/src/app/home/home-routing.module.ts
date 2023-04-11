import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from '../profile/profile.component';
import { HomeBodyComponent } from './home-body/home-body.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeBodyComponent,
      },
      {
        path: 'shopping-cart',
        loadChildren: () =>
          import('../shopping-cart/shopping-cart.module').then(
            (m) => m.ShoppingCartModule
          ),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('../order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'profile',
        component: ProfileComponent,
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
