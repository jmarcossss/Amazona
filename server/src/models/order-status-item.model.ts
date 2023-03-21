import BaseModel from './base.model';
import OrderStatusModel from './order-status.model';
export default class OrderStatusItemModel extends BaseModel {
  status: OrderStatusModel;
  date: string;
  constructor({ id, status, date}: { id: string; status: OrderStatusModel, date: string}) {
    super(id);
    this.status = status;
    this.date = date;
  }
}
