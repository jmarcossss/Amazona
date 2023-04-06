import OrderEntity from '../entities/order.entity';
import { InternalServerError } from '../utils/errors/http.error';
import { BaseRepository } from './base.repository';

class OrderRepository extends BaseRepository<OrderEntity> {
  constructor() {
    super('orders');
  }
  public async getOrder(): Promise<OrderEntity[]> {
    try {
      return await this.findAll();
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async getOrderById(id: string): Promise<OrderEntity | undefined> {
    try {
      let orders = await this.findAll();
      let order = orders.find((order) => order.id === id);
      return order;
    } catch (e) {
      throw new InternalServerError();
    }
  }
  public async updateOrder(data: OrderEntity): Promise<OrderEntity | undefined> {
    try {
      let order = await this.update(data);
      return order;
    } catch (e) {
      throw new InternalServerError();
    }
  }
  public async createOrder(data: OrderEntity): Promise<OrderEntity | undefined> {
    try {
      let order = await this.add(data);
      return order;
    } catch (e) {
      throw new InternalServerError();
    }
  }
}

export default OrderRepository;
