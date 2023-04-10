import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RecoverPasswordStep } from '../enums/recover-password-step.enum';
import { RecoverPasswordService } from '../recover-password.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { ApiMessageCodes } from '../../../shared/utils/api-message-codes';
import { distinctUntilChanged } from 'rxjs';
import { RequestStatus } from 'src/app/shared/utils/request-status';
@Component({
  selector: 'app-request-code',
  templateUrl: './request-code.component.html',
  styleUrls: ['./request-code.component.css']
})
export class RequestCodeComponent  implements OnInit {

  recoverPasswordRequestCodeForm!: FormGroup;

    constructor(
    public recoverPasswordService: RecoverPasswordService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(){
    this.recoverPasswordRequestCodeForm = this.recoverPasswordService.recoverPasswordRequestCodeForm;

    this.recoverPasswordService.recoverPasswordRequestCodeValidateStatus$
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
        });
      });
  }

  onSubmit(): void {
    this.recoverPasswordService.submitRequestCode();
  }

}
