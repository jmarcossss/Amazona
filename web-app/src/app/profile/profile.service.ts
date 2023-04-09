import { Injectable } from '@angular/core';
import { BaseService } from "../services/base.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ProfileForm } from './enums/profile-form.enum';
import { HttpService } from '../services/http.service';
import { RequestStatus } from '../shared/utils/request-status';
import { ErrorResponse } from '../shared/utils/response';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService {
  private prefix: string = '/users';
  private mockedUser =
  {
    "id": "ce6f5c66-1967-4b21-9929-51ca7d652151",
    "CPF": "12989087064",
    "name": "Clara Acrucha",
    "username": "acruchao",
    "email": "acrucha@mail.com",
    "payment": "PIX",
    "address": [
        "Avenida Acrucha 5"
    ],
    "phone": "999789923", 
  }

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
    private httpService: HttpService
  ) {
    super();
    this.profilePersonalDataForm = this.formBuilder.group({
      name: [this.mockedUser.name, Validators.required],
      CPF: [this.mockedUser.CPF],
      phone: [this.mockedUser.phone, Validators.minLength(11)],
      username: [this.mockedUser.username],
      email: [this.mockedUser.email],
      payment: [this.mockedUser.payment]
    });

    this.profileAddressForm = this.formBuilder.group({
      mainAddress: [this.mockedUser.address[0] ? this.mockedUser.address[0] : ''],
      address2: [this.mockedUser.address[1] ? this.mockedUser.address[1] : ''],
      address3: [this.mockedUser.address[2] ? this.mockedUser.address[2] : ''],
    });

    this.profileDeleteForm = this.formBuilder.group({
      password: ['']
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
    const mockedId = "ce6f5c66-1967-4b21-9929-51ca7d652151";
    this.profileSaveValidateStatus.next(RequestStatus.loading());
    
    console.log("PersonalDataForm" + this.profilePersonalDataForm.getRawValue());
    console.log("AddressForm" + this.profileAddressForm.getRawValue());

    const response = await firstValueFrom(
      this.httpService.post(`${this.prefix}/${mockedId}`, {
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
    const mockedId = "ce6f5c66-1967-4b21-9929-51ca7d652151";
    this.profileDeleteValidateStatus.next(RequestStatus.loading());

    console.log("DeleteForm" + this.profileDeleteForm.getRawValue());
    const response = await firstValueFrom(
      this.httpService.post(`${this.prefix}/${mockedId}`, {
        password: this.profileDeleteForm.getRawValue().password
      })
    );

    response.handle({
      onSuccess: (_) => {
        this.profileDeleteValidateStatus.next(RequestStatus.success(''));
      },
      onFailure: (error) => {
        this.profileDeleteValidateStatus.next(RequestStatus.failure(error));
      },
    });
  }
}