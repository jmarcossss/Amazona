import OrderStatusModel from '../models/order-status.model';
import OrderStatusRepository from '../repositories/order-status.repository';
import { NotFoundError } from '../utils/errors/http.error';

class OrderStatusServiceMessageCode {
  public static readonly order_status_not_found =
    'order_status_not_found';
}

class OrderStatusService {
  private orderStatusRepository: OrderStatusRepository;

  constructor(orderStatusRepository: OrderStatusRepository) {
    this.orderStatusRepository = orderStatusRepository;
  }

  public async getOrderStatus(): Promise<OrderStatusModel[]> {
    try {
      const orderStatusEntity =
        await this.orderStatusRepository.getOrderStatus();

      const ordersStatus = orderStatusEntity.map(
        (orderStatus) => {
          return new OrderStatusModel(orderStatus);
        }
      );

      return ordersStatus;
    } catch (e) {
      throw e;
    }
  }

  public async getOrderStatusById(
    id: string
  ): Promise<OrderStatusModel> {
    try {
      const orderStatus =
        await this.orderStatusRepository.getOrderStatusById(id);
      if (!orderStatus) {
        throw new NotFoundError({
          msg: 'Status do Pedido não encontrado!',
          msgCode:
          OrderStatusServiceMessageCode.order_status_not_found,
        });
      }

      return new OrderStatusModel(orderStatus);
    } catch (e) {
      throw e;
    }
  }
}

export default OrderStatusService;
