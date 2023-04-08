import BaseModel from './base.model';

export default class OrderStatusModel extends BaseModel {
  status: string;

  constructor({ id, status }: { id: string; status: string }) {
    super(id);
    this.status = status;
  }
}
