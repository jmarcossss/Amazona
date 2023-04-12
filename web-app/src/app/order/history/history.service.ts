import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseService } from '../../services/base.service';
import { HttpService } from '../../services/http.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { RequestStatus } from '../../shared/utils/request-status';
import { ErrorResponse } from '../../shared/utils/response';
import OrderModel from '../../models/order.model';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService extends BaseService {
  private prefix: string = '/orders/history';
  public historyForm: FormGroup;
  statusConfirmed: boolean;
  statusInTransit: boolean;
  statusDelivered: boolean;
  statusCanceled: boolean;
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
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {
    super();
    this.historyForm = this.formBuilder.group({
      InputName: '',
      DateBegin: '',
      DateEnd: '',
    });
    this.inputName = this.historyForm.get('InputName');
    this.beginDate = this.historyForm.get('DateBegin');
    this.endDate = this.historyForm.get('DateEnd');
    this.statusConfirmed = false;
    this.statusInTransit = false;
    this.statusDelivered = false;
    this.statusCanceled = false;
  }
  public setConfirmed(): void {
    this.statusConfirmed = true;
  }
  public setInTransit(): void {
    this.statusInTransit = true;
  }
  public setDelivered(): void {
    this.statusDelivered = true;
  }
  public setCanceled(): void {
    this.statusCanceled = true;
  }
  public checkRecomprar(currentOrder: string): boolean {
    return currentOrder === 'delivered' || currentOrder === 'canceled';
  }
  public checkAcompanharPedido(currentOrder: string): boolean {
    return currentOrder === 'in transit' || currentOrder === 'confirmed';
  }
  public checkNotaFiscal(currentOrder: string): boolean {
    return (
      currentOrder === 'in transit' ||
      currentOrder === 'confirmed' ||
      currentOrder === 'delivered'
    );
  }
  public checkCancelar(currentOrder: string): boolean {
    return currentOrder === 'in transit' || currentOrder === 'confirmed';
  }
  public clean(): void {
    this.statusConfirmed = false;
    this.statusInTransit = false;
    this.statusDelivered = false;
    this.statusCanceled = false;
    this.inputName?.setValue('');
    this.beginDate?.setValue('');
    this.endDate?.setValue('');
  }
  public async buscar(): Promise<OrderModel[]> {
    const userId = this.authenticationService.getUser()?.id;
    let uri: string = `${this.prefix}/${userId}?`;
    if (!!this.inputName) {
      uri += `productName=${encodeURIComponent(this.inputName.value)}&`;
    }
    if (!!this.beginDate?.value && !!this.endDate?.value) {
      uri += `initialDate=${encodeURIComponent(
        this.beginDate.value
      )}&endDate=${encodeURIComponent(this.endDate.value)}`;
    }

    let statusString: string = '';
    if (this.statusConfirmed) statusString += 'confirmed';
    if (this.statusInTransit) statusString += 'in transit';
    if (this.statusDelivered) statusString += 'delivered';
    if (this.statusCanceled) statusString += 'canceled';

    if (!!statusString) {
      uri += `historiesStatus=${statusString}&`;
    }

    const response = await firstValueFrom(this.httpService.get(uri));
    let resposta: OrderModel[] = [];
    response.handle({
      onSuccess: (resp) => {
        const orders = (resp.data as any[]).map(
          (order: any) => new OrderModel(order)
        );
        this.historyStatus.next(RequestStatus.success(resp));
        resposta = orders;
      },
      onFailure: (error) => {
        this.historyStatus.next(RequestStatus.failure(error));
      },
    });
    return resposta as OrderModel[];
  }
}
