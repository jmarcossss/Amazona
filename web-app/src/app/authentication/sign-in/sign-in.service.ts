import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  public signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  public submitForm(): void {
    this.signInForm.markAllAsTouched();

    if (this.signInForm.valid) {
      // TODO: Request login
    }
  }
}
