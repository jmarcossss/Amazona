import BaseEntity from './base.entity';

export default class OrderEntity extends BaseEntity {
  constructor(data: Partial<OrderEntity>) {
    super(data.id || '');
  }
}
