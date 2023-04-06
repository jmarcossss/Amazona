import BaseEntity from './base.entity';

export default class OrderStatusEntity extends BaseEntity {
  status: string;

  constructor(data: Partial<OrderStatusEntity>) {
    super(data.id || '');
    this.status = data.status || '';
  }
}
