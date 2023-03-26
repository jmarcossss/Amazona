import { Router, Request, Response } from 'express';
import OrderService from '../services/order.service';
import OrderEntity from '../entities/order.entity';
import { Result, SuccessResult } from '../utils/result';
import OrderStatusItemEntity from '../entities/order-status-item.entity';

class OrderController {
  private prefix: string = '/orders';
  public router: Router;
  private orderService: OrderService;

  constructor(router: Router, orderService: OrderService) {
    this.router = router;
    this.orderService = orderService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getOrderById(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createOrder(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateOrderById(req, res)
    );
  }
  
  private async getOrderById(req: Request, res: Response) {
    let order = await this.orderService.getOrderById(req.params.id);
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: order,
    }).handleSuccess(res);
  }

  private async updateOrderById(req: Request, res: Response) {
    await this.orderService.updateOrderById(req.params.id, new OrderStatusItemEntity(req.body));
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handleSuccess(res);
  }

  private async createOrder(req: Request, res: Response): Promise<Response> {
    await this.orderService.createOrder(new OrderEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handleSuccess(res);
  }
}

export default OrderController;
