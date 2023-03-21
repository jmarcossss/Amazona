import OrderStatusEntity from '../entities/order-status.entity';
import { InternalServerError } from '../utils/errors/http.error';
import { BaseRepository } from './base.repository';

class OrderStatusRepository extends BaseRepository<OrderStatusEntity> {
  constructor() {
    super('order-status');
  }

  public async getStatusOrder(): Promise<OrderStatusEntity[]> {
    try {
      return await this.findAll();
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async getProductCategoryById(
    id: string
  ): Promise<OrderStatusEntity | undefined> {
    try {
      let statusOrders = await this.findAll();
      let statusOrder = statusOrders.find(
        (statusOrder) => statusOrder.id === id
      );

      return statusOrder;
    } catch (e) {
      throw new InternalServerError();
    }
  }
}

export default OrderStatusRepository;
