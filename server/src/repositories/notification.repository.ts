import NotificationEntity from '../entities/notification.entity';
import { BaseRepository } from './base.repository';
import { InternalServerError } from '../utils/errors/http.error';

class NotificationRepository extends BaseRepository<NotificationEntity> {
  constructor() {
    super('notifications');
  }
  public async getNotifications(): Promise<NotificationEntity[]> {
    try {
      let res = await this.findAll();
      return res
    } catch (e) {
      console.log(e)
      throw new InternalServerError();
    }
  }
  public async createNotification(data: NotificationEntity): Promise<NotificationEntity | undefined> {
    try {
      let notification = await this.add(data);
      return notification;
    } catch (e) {
      throw new InternalServerError();
    }
  }
}

export default NotificationRepository;
