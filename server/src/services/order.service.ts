import OrderRepository from '../repositories/order.repository';
import UserRepository from '../repositories/user.repository';

class OrderServiceMessageCode {}

class OrderService {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
}

export default OrderService;
