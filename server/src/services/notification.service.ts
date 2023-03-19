import NotificationRepository from '../repositories/notification.repository';

class NotificationServiceMessageCode {}

class NotificationService {
  private notificationRepository: NotificationRepository;
  constructor(notificationRepository: NotificationRepository) {
    this.notificationRepository = notificationRepository;
  }
}

export default NotificationService;
