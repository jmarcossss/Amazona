import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '../../services/base.service';
import { HttpService, Response } from '../../services/http.service';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { RequestStatus } from '../utils/request-status';
import { ErrorResponse } from '../utils/response';
import NotificationModel from 'src/app/models/notification.model';
import { NotificationsComponent } from './notifications.component';

@Injectable({
  providedIn: 'root',
})

export class NotificationsService extends BaseService {
  private prefix: string = '/notifications/user';
  private userId: string = 'ce6f5c66-1967-4b21-9929-51ca7d652151'
  public notificationForm: FormGroup;
  statusAtivo: boolean;
  statusProcessando: boolean;
  statusCancelado: boolean;
  actualDate;

  public notificationStatus: BehaviorSubject<RequestStatus<any, ErrorResponse>> =
    new BehaviorSubject<RequestStatus<any, ErrorResponse>>(
      RequestStatus.idle()
    );

  public notificationStatus$ = this.notificationStatus.asObservable();


  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {
    super()
    this.notificationForm = this.formBuilder.group({
      dateActual: ''
    });
    this.actualDate = this.notificationForm.get('dateActual');
    this.statusAtivo = false;
    this.statusProcessando = false;
    this.statusCancelado = false;
  }

  public setAtivo(): void {
    this.statusAtivo = true;
  }

  public setConcluido(): void {
    this.statusProcessando = true;
  }

  public setCancelado(): void {
    this.statusCancelado = true;
  }

  public clean(): void {
    this.statusAtivo = false;
    this.statusProcessando = false;
    this.statusCancelado = false;
    this.actualDate?.setValue("")
  }

  public async buscar(selectedDate?: Date ): Promise<NotificationModel[]> {
    let uri: string = `${this.prefix}/${this.userId}?`

    const response = await firstValueFrom(
      this.httpService.get(uri)
    );
    let resposta: NotificationModel[] = []
    response.handle({
      onSuccess: (resp) => {
        const notifications = (resp.data as any[]).map((notification: any) => 
        new NotificationModel(notification))
        this.notificationStatus.next(RequestStatus.success(resp));
        resposta = notifications
      },
      onFailure: (error) => {
        this.notificationStatus.next(RequestStatus.failure(error));
      },
    });
    return (resposta as NotificationModel[])
  }



}