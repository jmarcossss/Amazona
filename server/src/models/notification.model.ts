import BaseModel from './base.model';
import OrderModel from './order.model'
export default class NotificationModel extends BaseModel {
  title: string;
  description: string;
  orderId: string;
  date: Date;
  userId: string;
  constructor({ id, title, description, orderId, date, userId}: 
    { id: string; title:string; description:string; orderId: string, date: Date, userId: string}) {
    super(id);
    this.title = title;
    this.description = description;
    this.orderId = orderId;
    this.date = date;
    this.userId = userId;
  }
}
