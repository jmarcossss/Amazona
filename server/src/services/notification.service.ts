import NotificationEntity from '../entities/notification.entity';
import NotificationModel from '../models/notification.model'
import NotificationRepository from '../repositories/notification.repository';
import OrderService from './order.service';
import { BadRequestError, NotFoundError } from '../utils/errors/http.error';
import logger from '../logger';

class NotificationServiceMessageCode {
  public static readonly notification_not_found = 'notification_not_found';
  public static readonly notification_not_created = 'notification_not_created';
  public static readonly notification_not_updated = 'notification_not_updated';
}

class NotificationService {
  private notificationRepository: NotificationRepository;
  private orderService: OrderService;
  
  constructor(
    notificationRepository: NotificationRepository,
    orderService: OrderService
  ) {
    this.notificationRepository = notificationRepository;
    this.orderService = orderService;
  }
  public async getNotifications(): Promise<NotificationModel[]> {
    try {
      const notifications = await this.notificationRepository.getNotifications();
      
      const results = await Promise.all(
        notifications.map(async (notification) => {
          try {
            const order = await this.orderService.getOrderById(notification.orderId);
            
            return new NotificationModel({
              ...notification,
              order: order
            });
          } catch (e) {
            logger.error(
              `[NotificationService][getNotifications] Error while processing notification ${notification.id}:`,
              e
            );
            return null;
          }
        })
      );

      const filteredResults = results.filter(
        (result) => result !== null
      ) as NotificationModel[];

      return filteredResults;
    } catch (e) {
      throw e;
    }
  }


  public async createNotification(data: NotificationEntity): Promise<void> {
    try {
      const notification = await this.notificationRepository.createNotification(data);

      if (!notification) {
        throw new BadRequestError({
          msg: 'erro ao criar Notificação',
          msgCode: NotificationServiceMessageCode.notification_not_created,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}

export default NotificationService;
