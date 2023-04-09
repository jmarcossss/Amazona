import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import InputMask from '../../../shared/utils/input-mask';
import { SignUpService } from '../sign-up.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../services/snack-bar.service';
import { ApiMessageCodes } from '../../../shared/utils/api-message-codes';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-sign-up-form-payment',
  templateUrl: './sign-up-form-payment.component.html',
  styleUrls: ['./sign-up-form-payment.component.css'],
})
export class SignUpFormPaymentComponent implements OnInit {
  signUpPaymentForm!: FormGroup;
  creditMask = InputMask.CREDIT;

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.signUpPaymentForm = this.signUpService.signUpPaymentForm;

    this.signUpService.signUpStatus$
      .pipe(distinctUntilChanged((a, b) => a.status === b.status))
      .subscribe((status) => {
        status.maybeMap({
          failed: (error) => {
            this.snackBarService.showError({
              message: ApiMessageCodes.codeToMessage(
                Array.isArray(error.msgCode) ? error.msgCode[0] : error.msgCode
              ),
            });
          },
          succeeded: (_) => {
            this.snackBarService.showSuccess({
              message: 'Cadastro realizado com sucesso!',
            });

            this.router.navigate(['/']);
          },
        });
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
