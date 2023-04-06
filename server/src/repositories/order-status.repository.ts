import OrderStatusEntity from '../entities/order-status.entity';
import { InternalServerError } from '../utils/errors/http.error';
import { BaseRepository } from './base.repository';

class OrderStatusRepository extends BaseRepository<OrderStatusEntity> {
  constructor() {
    super('order-status');
  }

  public async getOrderStatus(): Promise<OrderStatusEntity[]> {
    try {
      return await this.findAll();
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async getOrderStatusById(
    id: string
  ): Promise<OrderStatusEntity | undefined> {
    try {
      let ordersStatus = await this.findAll();
      let orderStatus = ordersStatus.find(
        (orderStatus) => orderStatus.id === id
      );

      return orderStatus;
    } catch (e) {
      throw new InternalServerError();
    }
  }
}

export default OrderStatusRepository;
