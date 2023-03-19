import { Router } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  private prefix: string = '/orders';
  public router: Router;
  private orderService: OrderService;

  constructor(router: Router, orderService: OrderService) {
    this.router = router;
    this.orderService = orderService;
    this.initRoutes();
  }

  private initRoutes() {}
}

export default OrderController;
