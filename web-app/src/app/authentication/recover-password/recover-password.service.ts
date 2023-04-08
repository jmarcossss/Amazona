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
  private prefix: string = '/authentication/recover-password'

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


  public recoverPasswordStatus: BehaviorSubject<RequestStatus<string, ErrorResponse>> =
    new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
      RequestStatus.idle()
    );
  public recoverPasswordStatus$ = this.recoverPasswordStatus.asObservable();

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
            confirm_password: [
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
    await this.recoverPassword();
  }

  public async submitRequestCode(): Promise<void> {
    await this.recoverPassword();
  }

  public async submitRequestPassword(): Promise<void> {
    await this.recoverPassword();
  }

  public async recoverPassword(): Promise<void> {
    this.recoverPasswordStatus.next(RequestStatus.loading());

    const response = await firstValueFrom(
      this.httpService.post(`${this.prefix}`,
        {
          username: this.recoverPasswordRequestEmailForm.getRawValue().email,
          code: this.recoverPasswordRequestCodeForm.getRawValue().code,
          password: this.recoverPasswordRequestPasswordForm.getRawValue().password
        }
        )
      );
    response.handle({
      onSuccess: (_) => {
        this.recoverPasswordStatus.next(RequestStatus.success(''));
      },
      onFailure: (error) => {
        this.recoverPasswordStatus.next(RequestStatus.failure(error));
      },
    });
  }
}


