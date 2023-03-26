import { Router, Request, Response } from 'express';
import NotificationEntity from '../entities/notification.entity';
import NotificationService from '../services/notification.service';
import { Result, SuccessResult } from '../utils/result';

class NotificationController {
  private prefix: string = '/notifications';
  public router: Router;
  private notificationService: NotificationService;

  constructor(router: Router, notificationService: NotificationService) {
    this.router = router;
    this.notificationService = notificationService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getNotifications(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createNotification(req, res)
    );
  }

  private async getNotifications(req: Request, res: Response) {
    let notifications = await this.notificationService.getNotifications();
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: notifications
    }).handleSuccess(res);
  }

  private async createNotification(req: Request, res: Response): Promise<Response> {
    await this.notificationService.createNotification(new NotificationEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handleSuccess(res);
  }
}

export default NotificationController;
