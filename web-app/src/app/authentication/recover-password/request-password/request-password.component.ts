import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RecoverPasswordService } from '../recover-password.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { ApiMessageCodes } from '../../../shared/utils/api-message-codes';
import { distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.css']
})
export class RequestPasswordComponent implements OnInit {

  recoverPasswordRequestPasswordForm!: FormGroup;



    constructor(
    public recoverPasswordService: RecoverPasswordService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(){
    this.recoverPasswordRequestPasswordForm = this.recoverPasswordService.recoverPasswordRequestPasswordForm;

    this.recoverPasswordService.recoverPasswordRequestPasswordValidateStatus$
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
          succeeded:(_) => {
            this.router.navigate(['/']);
          }
        });
      });
  }

  onSubmit(): void {
    this.recoverPasswordService.submitRequestPassword();
  }

}
