import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from './base.service';
import { Response, SuccessResponse } from '../shared/utils/response';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends BaseService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.baseUrl = environment.apiUrl ?? '';
  }

  private getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return { headers };
  }

  get(url: string): Observable<Response> {
    return this.http.get<any>(`${this.baseUrl}${url}`, this.getHeaders()).pipe(
      map((response) => new SuccessResponse(response)),
      catchError(this.handleError('get'))
    );
  }

  post(url: string, data: any): Observable<Response> {
    return this.http
      .post<any>(`${this.baseUrl}${url}`, data, this.getHeaders())
      .pipe(
        map((response) => new SuccessResponse(response)),
        catchError(this.handleError('post'))
      );
  }

  put(url: string, data: any): Observable<Response> {
    return this.http
      .put<any>(`${this.baseUrl}${url}`, data, this.getHeaders())
      .pipe(
        map((response) => new SuccessResponse(response)),
        catchError(this.handleError('put'))
      );
  }

  delete(url: string): Observable<Response> {
    return this.http
      .delete<any>(`${this.baseUrl}${url}`, this.getHeaders())
      .pipe(
        map((response) => new SuccessResponse(response)),
        catchError(this.handleError('delete'))
      );
  }
}
export { Response };
