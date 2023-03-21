import { Router, Request, Response } from 'express';
import OrderStatusService from '../services/order-status.service';
import { Result, SuccessResult } from '../utils/result';

class OrderStatusController {
  private prefix: string = '/order-status';
  public router: Router;
  private orderStatusService: OrderStatusService;

  constructor(
    router: Router,
    orderStatusService: OrderStatusService
  ) {
    this.router = router;
    this.orderStatusService = orderStatusService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getOrderStatus(req, res)
    );
  }

  private async getOrderStatus(
    req: Request,
    res: Response
  ): Promise<Response> {
    let ordersStatus =
      await this.orderStatusService.getOrderStatus();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: ordersStatus,
    }).handleSuccess(res);
  }
}

export default OrderStatusController;
