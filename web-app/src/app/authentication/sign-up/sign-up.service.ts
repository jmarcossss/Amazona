import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpFormStep } from './enums/sign-up-form-step.enum';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BaseService } from '../../services/base.service';
import { HttpService } from '../../services/http.service';
import { RequestStatus } from '../../shared/utils/request-status';
import { ErrorResponse } from '../../shared/utils/response';

@Injectable({
  providedIn: 'root',
})
export class SignUpService extends BaseService {
  private prefix: string = '/authentication/sign-up';

  public signUpPersonalDataForm: FormGroup;
  public signUpAddressForm: FormGroup;
  public signUpPaymentForm: FormGroup;

  signUpFormStep: BehaviorSubject<SignUpFormStep> =
    new BehaviorSubject<SignUpFormStep>(SignUpFormStep.PersonalData);
  public signUpFormStep$ = this.signUpFormStep.asObservable();

  public signUpPersonalDataValidateStatus: BehaviorSubject<
    RequestStatus<string, ErrorResponse>
  > = new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
    RequestStatus.idle()
  );

  public signUpPersonalDataValidateStatus$ =
    this.signUpPersonalDataValidateStatus.asObservable();

  public signUpStatus: BehaviorSubject<RequestStatus<string, ErrorResponse>> =
    new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
      RequestStatus.idle()
    );

  public signUpStatus$ = this.signUpStatus.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {
    super();
    this.signUpPersonalDataForm = this.formBuilder.group({
      name: ['', Validators.required],
      CPF: ['', Validators.required],
      phone: ['', Validators.minLength(11)],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
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

    this.signUpAddressForm = this.formBuilder.group({
      mainAddress: [''],
      address2: [''],
      address3: [''],
    });

    this.signUpPaymentForm = this.formBuilder.group({
      paymentOption: ['', Validators.required],
      payment: [''],
    });
  }

  public initState() {
    this.signUpPersonalDataForm.reset();
    this.signUpAddressForm.reset();
    this.signUpPaymentForm.reset();

    this.signUpFormStep.next(SignUpFormStep.PersonalData);

    this.signUpPersonalDataValidateStatus.next(RequestStatus.idle());
    this.signUpStatus.next(RequestStatus.idle());
  }

  public async submitPersonalData(): Promise<void> {
    this.signUpPersonalDataForm.markAllAsTouched();

    if (this.signUpPersonalDataForm.valid) {
      this.signUpPersonalDataValidateStatus.next(RequestStatus.loading());

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.prefix}/validation`,
          this.signUpPersonalDataForm.getRawValue()
        )
      );

      response.handle({
        onSuccess: (_) => {
          this.signUpFormStep.next(SignUpFormStep.Address);

          this.signUpPersonalDataValidateStatus.next(RequestStatus.success(''));
        },
        onFailure: (error) => {
          this.signUpPersonalDataValidateStatus.next(
            RequestStatus.failure(error)
          );
        },
      });
    }
  }

  public backFromAddress(): void {
    this.signUpPersonalDataValidateStatus.next(RequestStatus.idle());
    this.signUpFormStep.next(SignUpFormStep.PersonalData);
  }

  public submitAddress(): void {
    this.signUpFormStep.next(SignUpFormStep.Payment);
  }

  public backFromPayment(): void {
    this.signUpStatus.next(RequestStatus.idle());
    this.signUpFormStep.next(SignUpFormStep.Address);
  }

  public async submitPayment(): Promise<void> {
    this.signUpPaymentForm.markAllAsTouched();

    if (this.signUpPaymentForm.valid) {
      await this.signUp();
    } else {
      this.signUpStatus.next(
        RequestStatus.failure(
          new ErrorResponse({
            msg: 'Você precisa selecionar uma opçaõ de pagamento!',
          })
        )
      );
    }
  }

  public async signUp(): Promise<void> {
    this.signUpStatus.next(RequestStatus.loading());

    const response = await firstValueFrom(
      this.httpService.post(`${this.prefix}`, {
        ...this.signUpPersonalDataForm.getRawValue(),
        address: [
          this.signUpAddressForm.getRawValue().mainAddress,
          this.signUpAddressForm.getRawValue().address2,
          this.signUpAddressForm.getRawValue().address3,
        ],
        payment: this.signUpPaymentForm.getRawValue().paymentOption,
      })
    );

    response.handle({
      onSuccess: (_) => {
        this.signUpFormStep.next(SignUpFormStep.End);

        this.signUpStatus.next(RequestStatus.success(''));
      },
      onFailure: (error) => {
        this.signUpStatus.next(RequestStatus.failure(error));
      },
    });
  }
}
