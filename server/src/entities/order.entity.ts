import BaseEntity from './base.entity';
import OrderStatusItemEntity from './order-status-item.entity'
export default class OrderEntity extends BaseEntity {
  userId: string;
  totalValue: string;
  purchaseDate: string;
  statusHistory: OrderStatusItemEntity[];
  productsIds: string[];
  address: string;
  payment: string;
  constructor(data: Partial<OrderEntity>) {
    super(data.id || '');
    this.userId = data.userId || '';
    this.totalValue = data.totalValue || '';
    this.purchaseDate = data.purchaseDate || '';
    this.statusHistory = data.statusHistory || [];
    this.productsIds = data.productsIds || [];
    this.address = data.address || '';
    this.payment = data.payment || '';
  }
}
