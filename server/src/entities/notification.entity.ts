import BaseEntity from './base.entity';

export default class NotificationEntity extends BaseEntity {
  title: string;
  description: string;
  orderId: string;
  constructor(data: Partial<NotificationEntity>) {
    super(data.id || '');
    this.title = data.title || '';
    this.description = data.description || '';
    this.orderId = data.orderId || '';
  }
}
