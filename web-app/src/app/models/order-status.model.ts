import BaseModel from './base.model';

export default class OrderStatusModel extends BaseModel {
  status: string;
  statusText: string;
  statusConfirmed: boolean;
  statusInTransit: boolean;
  statusDelivered: boolean;
  statusCanceled: boolean;
  errorMessage: string | null;

  constructor({ id, status, errorMessage }: { id: string; status: string; errorMessage?: string | null }) {
    super(id);
    this.status = status;

    this.statusText = '';
    this.statusConfirmed = false;
    this.statusInTransit = false;
    this.statusDelivered = false;
    this.statusCanceled = false;

    if (status) {
      switch (status) {
        case 'confirmed':
          this.statusText = 'Confirmado';
          this.statusConfirmed = true;
          break;
        case 'in transit':
          this.statusText = 'Em trânsito';
          this.statusInTransit = true;
          break;
        case 'delivered':
          this.statusText = 'Entregue';
          this.statusDelivered = true;
          break;
        case 'canceled':
          this.statusText = 'Cancelado';
          this.statusCanceled = true;
          break;
        default:
          this.statusText = 'Produto inexistente';
      }
    } else {
      this.statusText = 'Produto inexistente';
    }

    this.errorMessage = errorMessage || null;
  }
}
