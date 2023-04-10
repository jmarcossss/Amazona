import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private apiUrl = process.env['API_URL'];

  constructor(private http: HttpClient) {}

  getOrderStatus(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order-status`);
  }
}
