import OrderEntity from '../entities/order.entity';
import logger from '../logger';
import OrderModel from '../models/order.model';
import OrderStatusItemModel from '../models/order-status-item.model';
import OrderRepository from '../repositories/order.repository';
import { BadRequestError, NotFoundError } from '../utils/errors/http.error';
import OrderStatusService from './order-status.service';
import ProductService from './product.service';
import ProductModel from '../models/product.model';

class OrderServiceMessageCode {
  public static readonly order_not_found = 'product_not_found';
  public static readonly order_not_created = 'product_not_created';
}

class OrderService {
  private orderRepository: OrderRepository;
  private orderStatusService: OrderStatusService;
  private productService: ProductService;
  constructor(
    orderRepository: OrderRepository,
    orderStatusService: OrderStatusService,
    productService: ProductService
  ) {
    this.orderRepository = orderRepository;
    this.orderStatusService = orderStatusService;
    this.productService = productService;
  }

  public async getOrderById(id: string): Promise<OrderModel> {
    try {
      const order = await this.orderRepository.getOrderById(id);
      if (!order) {
        throw new NotFoundError({
          msg: 'Marca não encontrada!',
          msgCode: OrderServiceMessageCode.order_not_found,
        });
      }
      //console.log(order)
      /* get by id em cada order-status*/
      const statusHistory = await Promise.all(
        order.statusHistory.map(async (history) => {
          try {
            const orderStatus = await this.orderStatusService.getOrderStatusById(history.statusId);
            
            return new OrderStatusItemModel({
              ...history,
              status: orderStatus,
            });
          } catch (e) {
            logger.error(
              `[OrderService][getOrderById] Error while processing order-status-item ${history.id}:`,
              e
            );
            return null;
          }
        })
      ); 
      const filteredStatusHistory = statusHistory.filter(
        (result) => result !== null
      ) as OrderStatusItemModel[];

      /* get by id em cada product*/
      const products = await Promise.all(
        order.productsIds.map(async (id) => {
          try {
            console.log(`ID PRODUCT: ${id}`)
            const product = await this.productService.getProductById(id);
            console.log("PRODUCT:\n" + product)
            return product;
          } catch (e) {
            logger.error(
              `[OrderService][getOrderById] Error while processing product ${id}:`,
              e
            );
            return null;
          }
        })
      ); 
      const filteredProdutct = products.filter(
        (result) => result !== null
      ) as ProductModel[];
      return new OrderModel({
        ...order,
        statusHistory: filteredStatusHistory,
        products: filteredProdutct
      })
    } catch (e) {
      throw e;
    }
  }

  public async createOrder(data: OrderEntity): Promise<void> {
    try {
      const order = await this.orderRepository.createOrder(data);

      if (!order) {
        throw new BadRequestError({
          msg: 'Erro ao criar pedido!',
          msgCode: OrderServiceMessageCode.order_not_created,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}

export default OrderService;
