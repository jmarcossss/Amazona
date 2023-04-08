import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '../../services/base.service';
import { HttpService, Response } from '../../services/http.service';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { RequestStatus } from '../../shared/utils/request-status';
import { ErrorResponse } from '../../shared/utils/response';
import OrderModel from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})

export class HistoryService extends BaseService{
  private prefix: string = '/orders/history';
  private userId: string = 'aa6c5fd5-2f03-45b9-8749-f94bd20704be'
  public historyForm: FormGroup; 
  statusAtivo: boolean;
  statusProcessando: boolean;
  statusCancelado: boolean;
  inputName;
  beginDate;
  endDate;
  
  public historyStatus: BehaviorSubject<RequestStatus<any, ErrorResponse>> =
    new BehaviorSubject<RequestStatus<any, ErrorResponse>>(
      RequestStatus.idle()
    );

  public historyStatus$ = this.historyStatus.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
    ) {
    super()
    this.historyForm = this.formBuilder.group({
      InputName: '',
      DateBegin: '',
      DateEnd: '',
    });
    this.inputName = this.historyForm.get('InputName');
    this.beginDate = this.historyForm.get('DateBegin');
    this.endDate = this.historyForm.get('DateEnd');
    this.statusAtivo = false;
    this.statusProcessando = false;
    this.statusCancelado = false;
  }
  public setAtivo(): void{
    this.statusAtivo = true;
  }
  public setConcluido(): void{
    this.statusProcessando = true;
  }
  public setCancelado(): void{
    this.statusCancelado = true;
  }
  public clean(): void{
    this.statusAtivo = false;
    this.statusProcessando = false;
    this.statusCancelado = false;
    this.inputName?.setValue("")
    this.beginDate?.setValue("")
    this.endDate?.setValue("")
  }
  public async buscar(): Promise<OrderModel[]> {
    console.log(`${this.beginDate?.value} ${typeof(this.beginDate?.value)}       ${this.endDate?.value} ${typeof(this.endDate?.value)}`)
    let uri: string = `${this.prefix}/${this.userId}?`
    if(!!this.inputName){
      uri += `productName=${encodeURIComponent(this.inputName.value)}&`
    }
    if(!!this.beginDate?.value && !!this.endDate?.value){
      console.log(`entrando em datas`)
      uri += `initialDate=${encodeURIComponent(this.beginDate.value)}&endDate=${encodeURIComponent(this.endDate.value)}`
    }

    let statusString: string = ""
    if(this.statusAtivo) statusString += "active"
    if(this.statusProcessando) statusString += "processing"
    if(this.statusCancelado) statusString += "canceled"
    
    if(!!statusString){
      uri += `historiesStatus=${statusString}&`
    }
    
    const response = await firstValueFrom( 
      this.httpService.get(uri)
    );
    let resposta: OrderModel[]  = []
    response.handle({
      onSuccess: (resp) => {
        const orders = (resp.data as any[]).map((order: any) => new OrderModel(order))
        this.historyStatus.next(RequestStatus.success(resp));
        resposta = orders
      },
      onFailure: (error) => {
        this.historyStatus.next(RequestStatus.failure(error));
      },
    });
    return (resposta as OrderModel[])
  }
}