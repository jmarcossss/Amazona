import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '../../services/base.service';
import { HttpService, Response } from '../../services/http.service';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SignInService extends BaseService{
  public signInForm: FormGroup;
  private prefix: string = '/authentication/sign-in';
  signInService: any;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService,  signInService: SignInService) {
    super()
    this.signInForm = this.formBuilder.group({
      user: ['', Validators.required],
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

  signIn(data: any) {
    let jsonData = JSON.stringify(data);

    return this.httpService.post(this.prefix, jsonData).pipe(
      map((response: Response) => response),
    );
  }
  public submitForm(): void {
    this.signInForm.markAllAsTouched();

     if (this.signInForm.valid) {
      this.signInService(this.signInForm.getRawValue()).subscribe((response: Response) => {
        console.warn(response);
      });
    }
  }
}


