import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverPasswordStep } from './enums/recover-password-step.enum';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BaseService } from '../../services/base.service';
import { HttpService } from '../../services/http.service';
import { RequestStatus } from '../../shared/utils/request-status';
import { ErrorResponse } from '../../shared/utils/response';

@Injectable({
  providedIn: 'root',
})

export class RecoverPasswordService  extends BaseService{
  private prefix: string = '/authentication/recover-password'

  public recorverPassawordRequestEmail: FormGroup;
  public recorverPassawordRequestcode: FormGroup;
  public recorverPassawordRequestPassword: FormGroup;

  recoverPasswordStep: BehaviorSubject<RecoverPasswordStep> =
    new BehaviorSubject<RecoverPasswordStep>(RecoverPasswordStep.RequestEmail);
  public signUpFormStep$ = this.recoverPasswordStep.asObservable();


  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ){
    super()

    this. recorverPassawordRequestEmail = this.formBuilder.group({
      username: ['', Validators.minLength(4)],
      email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
    });

    this.recorverPassawordRequestcode = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this. recorverPassawordRequestPassword = this.formBuilder.group({
            password: [
              '',
              [
                Validators.compose([
                  Validators.required,
                  Validators.minLength(8),
                  Validators.maxLength(8),
                ]),
              ],
            ],
            confirm_password: [
              '',
              [
                Validators.compose([
                  Validators.required,
                  Validators.minLength(8),
                  Validators.maxLength(8),
                ]),
              ],
            ],
          });
    }
}


