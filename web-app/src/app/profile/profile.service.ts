import { Injectable } from '@angular/core';
import { BaseService } from "../services/base.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ProfileForm } from './enums/profile-form.enum';
import { HttpService } from '../services/http.service';
import { RequestStatus } from '../shared/utils/request-status';
import { ErrorResponse } from '../shared/utils/response';
import UserModel from '../models/user.model';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService {
  private prefix: string = '/users';
  private user: UserModel | undefined;
  private userId: string;

  public profilePersonalDataForm: FormGroup;
  public profileAddressForm: FormGroup;
  public profileDeleteForm: FormGroup;

  profileForm: BehaviorSubject<ProfileForm> =
    new BehaviorSubject<ProfileForm>(ProfileForm.PersonalData);
  public profileForm$ = this.profileForm.asObservable();
  
  public profileDeleteValidateStatus: BehaviorSubject<RequestStatus<string, ErrorResponse>> =
  new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
    RequestStatus.idle()
  );
  public profileDeleteValidateStatus$ = this.profileDeleteValidateStatus.asObservable();

  public profileSaveValidateStatus: BehaviorSubject<RequestStatus<string, ErrorResponse>> =
  new BehaviorSubject<RequestStatus<string, ErrorResponse>>(
    RequestStatus.idle()
  );
  public profileSaveValidateStatus$ = this.profileSaveValidateStatus.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {
    super();

    this.user = this.authenticationService.getUser();
    this.userId = this.user?.id || '';

    this.profilePersonalDataForm = this.formBuilder.group({
      name: ['', Validators.required],
      CPF: [''],
      phone: ['', Validators.minLength(11)],
      username: [''],
      email: [''],
      payment: ['']
    });

    this.profileAddressForm = this.formBuilder.group({
      mainAddress: [''],
      address2: [''],
      address3: [''],
    });

    this.profileDeleteForm = this.formBuilder.group({
      password: ['']
    });

    this.updateForms();
  }

  private updateForms() {
    if(!this.user) return;

    this.profilePersonalDataForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      CPF: [this.user.CPF],
      phone: [this.user.phone, Validators.minLength(11)],
      username: [this.user.username],
      email: [this.user.email],
      payment: [this.user.payment]
    });

    this.profileAddressForm = this.formBuilder.group({
      mainAddress: [this.user.address[0] ? this.user.address[0] : ''],
      address2: [this.user.address[1] ? this.user.address[1] : ''],
      address3: [this.user.address[2] ? this.user.address[2] : ''],
    });
  }

  public async submitHeader(form: number): Promise<void> {
    this.profileForm.next(form);
  }

  public async submitDelete(): Promise<void> {
    await this.delete();
  }

  public async submitSave(): Promise<void> {
    await this.update();
  }

  public async update(): Promise<void> {
    this.profileSaveValidateStatus.next(RequestStatus.loading());

    const response = await firstValueFrom(
      this.httpService.put(`${this.prefix}/${this.userId}`, {
        ...this.profilePersonalDataForm.getRawValue(),
        address: [
          this.profileAddressForm.getRawValue().mainAddress,
          this.profileAddressForm.getRawValue().address2,
          this.profileAddressForm.getRawValue().address3,
        ]
      })
    );

    response.handle({
      onSuccess: (_) => {
        this.profileSaveValidateStatus.next(RequestStatus.success(''));
      },
      onFailure: (error) => {
        this.profileSaveValidateStatus.next(RequestStatus.failure(error));
      },
    });
  }

  public async delete(): Promise<void> {
    this.profileDeleteValidateStatus.next(RequestStatus.loading());

    const response = await firstValueFrom(
      this.httpService.post(`${this.prefix}/${this.userId}`, {
        password: this.profileDeleteForm.getRawValue().password
      })
    );

    response.handle({
      onSuccess: (_) => {
        this.authenticationService.clear();
        this.profileDeleteValidateStatus.next(RequestStatus.success(''));
      },
      onFailure: (error) => {
        this.profileDeleteValidateStatus.next(RequestStatus.failure(error));
      },
    });
  }
}