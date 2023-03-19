import NotificationEntity from '../entities/notification.entity';
import { BaseRepository } from './base.repository';

class NotificationRepository extends BaseRepository<NotificationEntity> {
  constructor() {
    super('notifications');
  }
}

export default NotificationRepository;
