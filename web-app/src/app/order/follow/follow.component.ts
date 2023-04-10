import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderStatusService } from './follow.service'

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  orderId!: number;
  status = 'Confirmado';
  statusText = 'Confirmado';
  statusConfirmed = true;
  statusInTransit = false;
  statusDelivered = false;
  statusCanceled = false;

  constructor(private route: ActivatedRoute, private orderStatusService: OrderStatusService) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    this.orderStatusService.getOrderStatus(this.orderId).subscribe(response => {
      if (response.msgCode === 'success') {
        const orderStatus = response.data.find((order: any) => order.id === this.orderId);
        if (orderStatus) {
          this.updateStatus(orderStatus.status);
        }
      }
    });
  }

  updateStatus(status: string) {
    this.status = status;
    this.statusConfirmed = status === 'active';
    this.statusInTransit = status === 'processing';
    this.statusDelivered = status === 'delivered';
    this.statusCanceled = status === 'canceled';
    
    if (this.statusConfirmed) {
      this.statusText = 'Confirmado';
    } else if (this.statusInTransit) {
      this.statusText = 'Em trânsito';
    } else if (this.statusDelivered) {
      this.statusText = 'Entregue';
    } else if (this.statusCanceled) {
      this.statusText = 'Cancelado';
    }
  }
  
}