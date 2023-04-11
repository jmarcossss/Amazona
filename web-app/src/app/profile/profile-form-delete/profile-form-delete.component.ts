import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { ApiMessageCodes } from '../../shared/utils/api-message-codes';
import { SnackBarService } from '../../services/snack-bar.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-profile-form-delete',
  templateUrl: './profile-form-delete.component.html'
})
export class ProfileFormDeleteComponent implements OnInit {
  profileDeleteForm!: FormGroup;

  constructor(
    private profileService: ProfileService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileDeleteForm = this.profileService.profileDeleteForm;

    this.profileService.profileDeleteValidateStatus$
      .pipe(distinctUntilChanged((a, b) => a.status === b.status))
      .subscribe((status) => {
        status.maybeMap({
          loading: () => {},
          failed: (error) => {
            if (Array.isArray(error.msgCode)) {
              this.handleValidateError(error.msgCode);
            }

            if (
              [
                ApiMessageCodes.incorrect_password
              ]
            ) {
              this.snackBarService.showError({
                message: 'Senha incorreta',
              });
              return;
            }
          },succeeded: (_) => {
            this.snackBarService.showSuccess({
              message: 'Sua conta foi deletada com sucesso',
            });

            this.router.navigate(['/authentication/sign-in']);
          }
        });
      });
  }

  private handleValidateError(errorCodes: string[]) {
    const passwordControl = this.profileDeleteForm.get('password');

    if(passwordControl) {

        passwordControl.setErrors({
          required: '',
        });
    }

    this.profileDeleteForm.markAllAsTouched();
  }
}
