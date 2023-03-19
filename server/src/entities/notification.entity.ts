import BaseEntity from './base.entity';

export default class NotificationEntity extends BaseEntity {
  constructor(data: Partial<NotificationEntity>) {
    super(data.id || '');
  }
}
