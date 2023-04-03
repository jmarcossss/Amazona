import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormPaymentComponent } from './sign-up-form-payment.component';

describe('SignUpFormPaymentComponent', () => {
  let component: SignUpFormPaymentComponent;
  let fixture: ComponentFixture<SignUpFormPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpFormPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFormPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
