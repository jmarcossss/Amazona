import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverPasswordStep } from './enums/recover-password-step.enum';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BaseService } from '../../services/base.service';
import { HttpService } from '../../services/http.service';
import { RequestStatus } from '../../shared/utils/request-status';
import { ErrorResponse } from '../../shared/utils/response';

@Injectable({
  providedIn: 'root',
})

export class RecoverPasswordService  extends BaseService{
  private prefix: string = '/authentication/sign-up/recover-password'

  public recoverPasswordRequestEmailForm: FormGroup;
  public recoverPasswordRequestCodeForm: FormGroup;
  public recoverPasswordRequestPasswordForm: FormGroup;


  recoverPasswordStep: BehaviorSubject<RecoverPasswordStep> =
    new BehaviorSubject<RecoverPasswordStep>(RecoverPasswordStep.RequestEmail);
  public recoverPasswordStep$ = this.recoverPasswordStep.asObservable();


  public recoverPasswordRequestEmailValidateStatus: BehaviorSubject<
    RequestStatus<string, ErrorResponse>
  > = new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
    RequestStatus.idle()
  );

  public recoverPasswordRequestEmailValidateStatus$ =
    this.recoverPasswordRequestEmailValidateStatus.asObservable();



  public recoverPasswordRequestCodeValidateStatus: BehaviorSubject<
    RequestStatus<string, ErrorResponse>
  > = new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
    RequestStatus.idle()
  );

  public recoverPasswordRequestCodeValidateStatus$ =
    this.recoverPasswordRequestCodeValidateStatus.asObservable();



  public recoverPasswordRequestPasswordValidateStatus: BehaviorSubject<
    RequestStatus<string, ErrorResponse>
  > = new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
    RequestStatus.idle()
  );

  public recoverPasswordRequestPasswordValidateStatus$ =
    this.recoverPasswordRequestPasswordValidateStatus.asObservable();


  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ){
    super()

    this.recoverPasswordRequestEmailForm = this.formBuilder.group({
      email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
    });

    this. recoverPasswordRequestCodeForm = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this.recoverPasswordRequestPasswordForm = this.formBuilder.group({
            password: [
              '',
              [
                Validators.compose([
                  Validators.required,
                  Validators.minLength(8),
                  Validators.maxLength(8),
                ]),
              ],
            ],
          });
    }

  public async submitRequestEmail(): Promise<void> {
    await this.recoverPasswordEmail();
  }

  public async submitRequestCode(): Promise<void> {
    await this.recoverPasswordCode();
  }

  public async submitRequestPassword(): Promise<void> {
    await this.recoverPasswordReset();
  }


  public async recoverPasswordEmail(): Promise<void> {
    this.recoverPasswordRequestEmailValidateStatus.next(RequestStatus.loading());

    const response = await firstValueFrom(
      this.httpService.post(`${this.prefix}`,
          this.recoverPasswordRequestEmailForm.getRawValue()
        )
      );
    response.handle({
      onSuccess: (_) => {
        this.recoverPasswordRequestEmailValidateStatus.next(RequestStatus.success(''));

        this.recoverPasswordStep.next(RecoverPasswordStep.RequestCode);
      },
      onFailure: (error) => {
        this.recoverPasswordRequestEmailValidateStatus.next(RequestStatus.failure(error));
      },
    });
  }



    public async recoverPasswordCode(): Promise<void> {
    this.recoverPasswordRequestCodeValidateStatus.next(RequestStatus.loading());

    const response = await firstValueFrom(
      this.httpService.post(`${this.prefix}/code`, {
        email: this.recoverPasswordRequestEmailForm.getRawValue().email,
        code: this.recoverPasswordRequestCodeForm.getRawValue().code,
      }
        )
      );
    response.handle({
      onSuccess: (_) => {
        this.recoverPasswordRequestCodeValidateStatus.next(RequestStatus.success(''));

        this.recoverPasswordStep.next(RecoverPasswordStep.RequestPassword);
      },
      onFailure: (error) => {
        this.recoverPasswordRequestCodeValidateStatus.next(RequestStatus.failure(error));
      },
    });
  }


    public async recoverPasswordReset(): Promise<void> {
    this.recoverPasswordRequestPasswordValidateStatus.next(RequestStatus.loading());

    const response = await firstValueFrom(
      this.httpService.put(`${this.prefix}/reset`,{

        email: this.recoverPasswordRequestEmailForm.getRawValue().email,
        password: this.recoverPasswordRequestPasswordForm.getRawValue().password,
      }
        )
      );
    response.handle({
      onSuccess: (_) => {
        this.recoverPasswordRequestPasswordValidateStatus.next(RequestStatus.success(''));
      },
      onFailure: (error) => {
        this.recoverPasswordRequestPasswordValidateStatus.next(RequestStatus.failure(error));
      },
    });
  }
}


