import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationComponent } from './cancellation/cancellation.component';
import { DetailsComponent } from './details/details.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
      {
        path: 'cancellation/:id',
        component: CancellationComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class OrderRoutingModule {}
