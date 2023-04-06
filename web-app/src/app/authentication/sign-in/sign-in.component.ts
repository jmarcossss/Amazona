import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { FormGroup } from '@angular/forms';
import { SnackBarService } from '../../services/snack-bar.service';
import { ApiMessageCodes } from '../../shared/utils/api-message-codes';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm!: FormGroup;


  constructor(
    private signInService: SignInService,
    private snackBarService: SnackBarService,
    private router: Router,
    ) {}

  ngOnInit() {

    this.signInForm = this.signInService.signInForm;


    this.signInService.signInStatus$.subscribe((status) => {
      status.maybeMap({
        loading: () => {},
        failed: (error) => {
          if (
            [
              ApiMessageCodes.incorrect_credentials,
              ApiMessageCodes.incorrect_password,
            ].includes(Array.isArray(error.msgCode) ? error.msgCode[0] : error.msgCode)
          ) {
            this.handleValidateError();
          }

          this.snackBarService.showError({
            message: ApiMessageCodes.codeToMessage(Array.isArray(error.msgCode) ? error.msgCode[0] : error.msgCode),
          });
        },
         succeeded: (_) => {
          this.router.navigate(['/']);
         }
      });
    });
  }

  private handleValidateError() {
    const loginControl = this.signInForm.get('username');
    const passwordControl = this.signInForm.get('password');

    if (loginControl && passwordControl) {
      loginControl.setErrors({
        required: '',
      });

      passwordControl.setErrors({
        required: '',
      });
    }


    this.signInForm.markAllAsTouched();
  }


  onSubmit(): void {
    this.signInService.signIn();
  }

  }



