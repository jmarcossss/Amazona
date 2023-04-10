import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderStatusService } from './follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  orderId!: number;
  statusText = 'Confirmado';
  statusConfirmed = true;
  statusInTransit = false;
  statusDelivered = false;
  statusCanceled = false;

  statusArray = [
    { key: 'confirmed', text: 'Confirmado', flags: { confirmed: true, inTransit: false, delivered: false, canceled: false }},
    { key: 'in transit', text: 'Em trânsito', flags: { confirmed: false, inTransit: true, delivered: false, canceled: false }},
    { key: 'delivered', text: 'Entregue', flags: { confirmed: false, inTransit: false, delivered: true, canceled: false }},
    { key: 'canceled', text: 'Cancelado', flags: { confirmed: false, inTransit: false, delivered: false, canceled: true }},
  ];

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
    const mappedStatus = this.statusArray.find(s => s.key === status);
    if (mappedStatus) {
      this.statusText = mappedStatus.text;
      this.statusConfirmed = mappedStatus.flags.confirmed;
      this.statusInTransit = mappedStatus.flags.inTransit;
      this.statusDelivered = mappedStatus.flags.delivered;
      this.statusCanceled = mappedStatus.flags.canceled;
    }
  }
  
}
