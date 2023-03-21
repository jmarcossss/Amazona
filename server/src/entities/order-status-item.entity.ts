import BaseEntity from './base.entity';

export default class OrderStatusItemEntity extends BaseEntity {
  statusId: string;
  date: string;
  
  constructor(data: Partial<OrderStatusItemEntity>) {
    super(data.id || '');
    this.statusId = data.statusId || '';
    this.date = data.date || '';
  }
}
