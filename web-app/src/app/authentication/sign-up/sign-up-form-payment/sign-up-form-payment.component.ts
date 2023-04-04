import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import InputMask from '../../../shared/utils/input-mask';
import { SignUpService } from '../sign-up.service';
import { Router } from '@angular/router';
import { SignUpFormStep } from '../enums/sign-up-form-step.enum';

@Component({
  selector: 'app-sign-up-form-payment',
  templateUrl: './sign-up-form-payment.component.html',
  styleUrls: ['./sign-up-form-payment.component.css'],
})
export class SignUpFormPaymentComponent implements OnInit {
  signUpPaymentForm!: FormGroup;
  creditMask = InputMask.CREDIT;

  constructor(private signUpService: SignUpService, private router: Router) {}

  ngOnInit() {
    this.signUpPaymentForm = this.signUpService.signUpPaymentForm;

    this.signUpService.signUpFormStep$.subscribe((signUpFormStep) => {
      if (signUpFormStep === SignUpFormStep.End) {
        this.router.navigate(['/']);
      }
    });
  }

  get paymentOption() {
    return this.signUpPaymentForm.get('paymentOption')?.value;
  }

  onRadioChange(value: string) {
    if (!!value) {
      this.signUpPaymentForm.patchValue({ paymentOption: value, payment: '' });
    }
  }

  onBack(): void {
    this.signUpService.backFromPayment();
  }

  onSubmit(): void {
    this.signUpService.submitPayment();
  }
}
