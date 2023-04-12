import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SignUpService } from './sign-up.service';
import { SignUpHeaderStepComponent } from './sign-up-header-step/sign-up-header-step.component';
import { SignUpFormContainerComponent } from './sign-up-form-container/sign-up-form-container.component';
import { SignUpFormPersonalDataComponent } from './sign-up-form-personal-data/sign-up-form-personal-data.component';
import { SignUpFormAddressComponent } from './sign-up-form-address/sign-up-form-address.component';
import { SignUpFormPaymentComponent } from './sign-up-form-payment/sign-up-form-payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, SharedModule],
      declarations: [
        SignUpComponent,
        SignUpHeaderStepComponent,
        SignUpHeaderStepComponent,
        SignUpFormContainerComponent,
        SignUpFormPersonalDataComponent,
        SignUpFormAddressComponent,
        SignUpFormPaymentComponent,
      ],
      providers: [SignUpService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
