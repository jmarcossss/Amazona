import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import OrderStatusModel from '../../models/order-status.model';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrderStatus(orderId: number): Observable<OrderStatusModel> {
    return this.http.get<any>(`${this.apiUrl}/order-status`).pipe(
      map((response) => {
        if (response.msgCode === 'success') {
          const orderStatus = response.data.find((order: any) => order.id === orderId);
          if (orderStatus) {
            return new OrderStatusModel(orderStatus);
          }
        }
        return new OrderStatusModel({ id: '', status: '' });
      })
    );
  }
}
