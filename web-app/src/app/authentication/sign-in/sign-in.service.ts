import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '../../services/base.service';
import { HttpService, Response } from '../../services/http.service';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { RequestStatus } from '../../shared/utils/request-status';
import { ErrorResponse } from '../../shared/utils/response';


@Injectable({
  providedIn: 'root',
})

export class SignInService extends BaseService{
  private prefix: string = '/authentication/sign-in';

  public signInForm: FormGroup;

  public signInStatus: BehaviorSubject<RequestStatus<any, ErrorResponse>> =
    new BehaviorSubject<RequestStatus<any, ErrorResponse>>(
      RequestStatus.idle()
    );

  public signInStatus$ = this.signInStatus.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
    ) {
    super()
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
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
    });
  }
  public async signIn(): Promise<void> {
    this.signInForm.markAllAsTouched();

    if (this.signInForm.valid) {

      this.signInStatus.next(RequestStatus.loading());

      const response = await firstValueFrom(
        this.httpService.post(`${this.prefix}`,
         {
          username: this.signInForm.getRawValue().username,
          email: this.signInForm.getRawValue().username,
          password: this.signInForm.getRawValue().password
        }
        )
      );

      response.handle({
        onSuccess: (data) => {


          this.signInStatus.next(RequestStatus.success(data));
        },
        onFailure: (error) => {
          this.signInStatus.next(RequestStatus.failure(error));
        },
      });
    }
  }
}


