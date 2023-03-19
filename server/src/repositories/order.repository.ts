import OrderEntity from '../entities/order.entity';
import { BaseRepository } from './base.repository';

class OrderRepository extends BaseRepository<OrderEntity> {
  constructor() {
    super('orders');
  }
}

export default OrderRepository;
