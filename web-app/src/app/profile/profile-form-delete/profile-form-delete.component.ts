import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../profile.service';
import ValidatorsPattern from '../../shared/utils/validators-pattern';
import InputMask from '../../shared/utils/input-mask';
import { ApiMessageCodes } from '../../shared/utils/api-message-codes';
import { SnackBarService } from '../../services/snack-bar.service';
import { distinctUntilChanged } from 'rxjs';
import { style } from '@angular/animations';

@Component({
  selector: 'app-profile-form-delete',
  templateUrl: './profile-form-delete.component.html'
})
export class ProfileFormDeleteComponent implements OnInit {
  profileDeleteForm!: FormGroup;

  constructor(
    private profileService: ProfileService,
    private snackBarService: SnackBarService
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
