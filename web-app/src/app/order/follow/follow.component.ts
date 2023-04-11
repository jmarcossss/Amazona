import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderStatusService } from './follow.service';
import OrderStatusModel from '../../models/order-status.model';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  orderId!: number;
  orderStatus!: OrderStatusModel;

  constructor(private route: ActivatedRoute, private orderStatusService: OrderStatusService) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    this.orderStatusService.getOrderStatus(this.orderId).subscribe(
      (statusModel) => {
        this.orderStatus = statusModel;
      },
      (error) => {
        console.error('Error ao obter status do pedido:', error);
        this.orderStatus = new OrderStatusModel({ id: '', status: '', errorMessage: 'Erro ao obter status do pedido' });
      }
    );
  }
}
