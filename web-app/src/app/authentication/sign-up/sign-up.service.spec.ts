import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpService, Response } from '../../services/http.service';
import { SignUpService } from './sign-up.service';
import { RequestStatus } from '../../shared/utils/request-status';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ErrorResponse, SuccessResponse } from '../../shared/utils/response';
import { ApiMessageCodes } from '../../shared/utils/api-message-codes';
import { SignUpFormStep } from './enums/sign-up-form-step.enum';

describe('SignUpService', () => {
  const prefix = '/authentication/sign-up';
  let service: SignUpService;
  let httpService: HttpService;
  let personalFormData: any;
  let addressFormData: any;
  let paymentFormData: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SignUpService, FormBuilder, HttpService],
    });
    service = TestBed.inject(SignUpService);
    httpService = TestBed.inject(HttpService);
    personalFormData = {
      name: 'John Doe',
      CPF: '11111111111',
      phone: '11999999999',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '1234567d',
    };
    addressFormData = {
      mainAddress: 'test1',
      address2: 'test2',
      address3: 'test3',
    };
    paymentFormData = {
      paymentOption: 'pix',
      payment: '123456789',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submitPersonalData', () => {
    it('should call httpService.post with the correct data when the form is valid', async () => {
      const spy = spyOn(httpService, 'post').and.returnValue(
        of(new Response({}))
      );

      service.signUpPersonalDataForm.setValue(personalFormData);

      await service.submitPersonalData();

      expect(spy).toHaveBeenCalledWith(
        `${prefix}/validation`,
        personalFormData
      );
    });

    it('should set the status to loading when the validation process starts', async () => {
      const expectedStatus = RequestStatus.loading();

      service.signUpPersonalDataForm.setValue(personalFormData);

      spyOn(httpService, 'post').and.returnValue(of(new Response({})));

      service.submitPersonalData();

      expect(service.signUpPersonalDataValidateStatus.getValue()).toEqual(
        expectedStatus
      );
    });

    it('should set the status to success when the validation is successful', async () => {
      const expectedStatus = RequestStatus.success('');
      service.signUpPersonalDataForm.setValue(personalFormData);

      spyOn(httpService, 'post').and.returnValue(of(new SuccessResponse({})));

      await service.submitPersonalData();

      expect(service.signUpPersonalDataValidateStatus.getValue()).toEqual(
        expectedStatus
      );
      expect(service.signUpFormStep.getValue()).toEqual(SignUpFormStep.Address);
    });

    it('should set the status to failure when the validation fails', async () => {
      const errorResponse = new ErrorResponse({
        msgCode: [ApiMessageCodes.CPF_invalid_format],
      });

      const expectedStatus = RequestStatus.failure(errorResponse);
      service.signUpPersonalDataForm.setValue(personalFormData);

      spyOn(httpService, 'post').and.returnValue(of(errorResponse));

      await service.submitPersonalData();

      expect(service.signUpPersonalDataValidateStatus.getValue()).toEqual(
        expectedStatus
      );
    });
  });

  it('should set the signUpFormStep to PersonalData when backFromAddress is called', () => {
    service.backFromAddress();

    expect(service.signUpFormStep.getValue()).toEqual(
      SignUpFormStep.PersonalData
    );
    expect(service.signUpPersonalDataValidateStatus.getValue()).toEqual(
      RequestStatus.idle()
    );
  });

  it('should set the signUpFormStep to Payment when submitAddress is called', () => {
    service.submitAddress();

    expect(service.signUpFormStep.getValue()).toEqual(SignUpFormStep.Payment);
  });

  it('should set the signUpFormStep to Address when backFromPayment is called', () => {
    service.backFromPayment();

    expect(service.signUpFormStep.getValue()).toEqual(SignUpFormStep.Address);
    expect(service.signUpStatus.getValue()).toEqual(RequestStatus.idle());
  });

  it('should call signUp when submitPayment is called', () => {
    const spy = spyOn(service, 'signUp');

    service.submitPayment();

    expect(spy).toHaveBeenCalled();
  });

  describe('signUp', () => {
    it('should call httpService.post with the correct data when the form is valid', async () => {
      const spy = spyOn(httpService, 'post').and.returnValue(
        of(new Response({}))
      );

      service.signUpPersonalDataForm.setValue(personalFormData);
      service.signUpAddressForm.setValue(addressFormData);
      service.signUpPaymentForm.setValue(paymentFormData);

      await service.signUp();

      expect(spy).toHaveBeenCalledWith(`${prefix}`, {
        ...personalFormData,
        address: [
          addressFormData.mainAddress,
          addressFormData.address2,
          addressFormData.address3,
        ],
        payment: paymentFormData.paymentOption,
      });
    });

    it('should set the status to loading when the sign up process starts', async () => {
      const expectedStatus = RequestStatus.loading();

      spyOn(httpService, 'post').and.returnValue(of(new Response({})));

      service.signUp();

      expect(service.signUpStatus.getValue()).toEqual(expectedStatus);
    });

    it('should set the status to success when the sign up is successful', async () => {
      const expectedStatus = RequestStatus.success('');
      spyOn(httpService, 'post').and.returnValue(of(new SuccessResponse({})));

      await service.signUp();

      expect(service.signUpStatus.getValue()).toEqual(expectedStatus);
      expect(service.signUpFormStep.getValue()).toEqual(SignUpFormStep.End);
    });
  });
});
