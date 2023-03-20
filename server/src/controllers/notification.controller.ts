import { Router } from 'express';
import NotificationService from '../services/notification.service';

class NotificationController {
  private prefix: string = '/notifications';
  public router: Router;
  private notificationService: NotificationService;

  constructor(router: Router, notificationService: NotificationService) {
    this.router = router;
    this.notificationService = notificationService;
    this.initRoutes();
  }

  private initRoutes() {}
}

export default NotificationController;
