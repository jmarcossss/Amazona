import BaseModel from './base.model';
import OrderModel from './order.model'
export default class NotificationModel extends BaseModel {
  title: string;
  description: string;
  order: OrderModel;
  
  constructor({ id, title, description, order}: { id: string; title:string; description:string; order: OrderModel}) {
    super(id);
    this.title = title;
    this.description = description;
    this.order = order;
  }
}
