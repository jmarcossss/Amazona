import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { HistoryComponent } from './history/history.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [DetailsComponent, HistoryComponent, CancellationComponent],
  imports: [CommonModule, OrderRoutingModule],
})
export class OrderModule {}
