import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { HistoryComponent } from './history/history.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FollowComponent } from './follow/follow.component';

@NgModule({
  declarations: [DetailsComponent, HistoryComponent, CancellationComponent, FollowComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}
