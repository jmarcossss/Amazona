import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormPersonalDataComponent } from './sign-up-form-personal-data.component';
import { SignUpService } from '../sign-up.service';
import { RequestStatus } from '../../../shared/utils/request-status';
import { ErrorResponse } from '../../../shared/utils/response';
import { ApiMessageCodes } from '../../../shared/utils/api-message-codes';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpFormPersonalDataComponent', () => {
  let component: SignUpFormPersonalDataComponent;
  let fixture: ComponentFixture<SignUpFormPersonalDataComponent>;
  let personalFormData: Object;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, SharedModule],
      declarations: [SignUpFormPersonalDataComponent],
      providers: [SignUpService],
    }).compileComponents();

    personalFormData = {
      name: 'vvvv',
      CPF: '12345678901',
      phone: '81974642371',
      username: 'vvvv1',
      email: 'vvv1@gmail.com',
      password: 'test@123',
    };
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockFailureResponse = (code: string) =>
    RequestStatus.failure(
      new ErrorResponse({
        msgCode: [code],
      })
    );

  function expectControlToBeInvalid(
    component: SignUpFormPersonalDataComponent,
    fieldName: string,
    fieldValue: any
  ) {
    component.signUpService.signUpPersonalDataForm.setValue({
      ...personalFormData,
      [fieldName]: fieldValue,
    });

    component.ngOnInit();

    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(`.${fieldName} input`);

    expect(input.classList.contains('ng-invalid')).toBeTruthy();
  }

  function testApiValidationError(
    component: SignUpFormPersonalDataComponent,
    errorCode: string,
    invalidFieldSelector: string
  ) {
    component.signUpService.signUpPersonalDataForm.setValue(personalFormData);

    component.ngOnInit();

    component.signUpService.signUpPersonalDataValidateStatus.next(
      mockFailureResponse(errorCode)
    );

    fixture.detectChanges();
    const invalidInput = fixture.nativeElement.querySelector(
      `${invalidFieldSelector} input`
    );

    const validInputs = fixture.nativeElement.querySelectorAll(
      `app-text-input:not(${invalidFieldSelector}) input`
    );

    expect(invalidInput.classList.contains('ng-invalid')).toBeTruthy();

    validInputs.forEach((input: any) => {
      expect(input.classList.contains('ng-valid')).toBeTruthy();
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submitPersonalData when the "PRÓXIMO" button is clicked', () => {
    spyOn(component, 'onSubmit');

    const nextButton = fixture.nativeElement.querySelector('.next-button');

    nextButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  describe('Form validation', () => {
    it(`should set name as invalid if it is empty`, () => {
      expectControlToBeInvalid(component, 'name', '');
    });

    it('should set CPF as invalid if it is empty', () => {
      expectControlToBeInvalid(component, 'CPF', '');
    });

    it('should set CPF as invalid if it is invalid pattern', () => {
      expectControlToBeInvalid(component, 'CPF', '1234567890');
    });

    it('should set phone as invalid if it is invalid pattern', () => {
      expectControlToBeInvalid(component, 'phone', '2121');
    });

    it('should set username as invalid if it is invalid pattern', () => {
      expectControlToBeInvalid(component, 'username', '22');
    });

    it('should set email as invalid if it is empty', () => {
      expectControlToBeInvalid(component, 'email', '');
    });

    it('should set email as invalid if it is invalid pattern', () => {
      expectControlToBeInvalid(component, 'email', 'test');
    });

    it('should set password as invalid if it is empty', () => {
      expectControlToBeInvalid(component, 'password', '');
    });

    it('should set password as invalid if it is invalid pattern', () => {
      expectControlToBeInvalid(component, 'password', 'test');
    });
  });

  describe('API validation', () => {
    it(`should set email control to invalid when the API returns the ${ApiMessageCodes.email_invalid_format} error code`, () => {
      testApiValidationError(
        component,
        ApiMessageCodes.email_invalid_format,
        '.email'
      );
    });

    it(`should set email control to invalid when the API returns the ${ApiMessageCodes.email_unavailable} error code`, () => {
      testApiValidationError(
        component,
        ApiMessageCodes.email_unavailable,
        '.email'
      );
    });

    it(`should set CPF control to invalid when the API returns the ${ApiMessageCodes.CPF_invalid_format} error code`, () => {
      testApiValidationError(
        component,
        ApiMessageCodes.CPF_invalid_format,
        '.CPF'
      );
    });

    it(`should set username control to invalid when the API returns the ${ApiMessageCodes.username_unavailable} error code`, () => {
      testApiValidationError(
        component,
        ApiMessageCodes.username_unavailable,
        '.username'
      );
    });

    it(`should set password control to invalid when the API returns the ${ApiMessageCodes.password_invalid_format} error code`, () => {
      testApiValidationError(
        component,
        ApiMessageCodes.password_invalid_format,
        '.password'
      );
    });
  });
});
