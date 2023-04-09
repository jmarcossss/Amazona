import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignUpFormPaymentComponent } from './sign-up-form-payment.component';
import { SignUpService } from '../sign-up.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { RequestStatus } from '../../../shared/utils/request-status';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpFormPaymentComponent', () => {
  let component: SignUpFormPaymentComponent;
  let fixture: ComponentFixture<SignUpFormPaymentComponent>;
  let signUpService: SignUpService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [SignUpFormPaymentComponent],
      providers: [SignUpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormPaymentComponent);
    component = fixture.componentInstance;
    signUpService = TestBed.inject(SignUpService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Test case need to be improved, it's need to change the value of the radio button and automatically call the onRadioChange method as expected.
  it('should set paymentOption to pix when the first radio button is selected', () => {
    component.onRadioChange('pix');
    fixture.detectChanges();

    expect(component.paymentOption).toEqual('pix');
  });

  // TODO: Test case need to be improved, it's need to change the value of the radio button and automatically call the onRadioChange method as expected.
  it('should set paymentOption to credit when the second radio button is selected', () => {
    component.onRadioChange('credit');
    fixture.detectChanges();

    expect(component.paymentOption).toEqual('credit');
  });

  describe('onSubmit', () => {
    it('should call onSubmit method when the "PRÓXIMO" button is clicked', () => {
      spyOn(component, 'onSubmit');
      const nextButton = fixture.nativeElement.querySelector(
        '.button-container > :last-child'
      );

      nextButton.click();
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should navigate to the next step when the "PRÓXIMO" button is clicked', () => {
      spyOn(signUpService, 'signUp').and.callFake(async () => {
        signUpService.signUpStatus.next(RequestStatus.success(''));
        return;
      });

      spyOn(component, 'onSubmit').and.callThrough();
      const navigateSpy = spyOn(router, 'navigate');

      const nextButton = fixture.nativeElement.querySelector(
        '.button-container > :last-child'
      );

      nextButton.click();

      expect(component.onSubmit).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  });

  it('should call onBack method when the "VOLTAR" button is clicked', () => {
    spyOn(component, 'onBack');
    const backButton = fixture.nativeElement.querySelector(
      '.button-container > :first-child'
    );

    backButton.click();
    expect(component.onBack).toHaveBeenCalled();
  });
});
