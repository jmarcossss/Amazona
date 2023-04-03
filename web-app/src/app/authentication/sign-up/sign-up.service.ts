import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpFormStep } from './enums/sign-up-form-step.enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  public signUpPersonalDataForm: FormGroup;
  signUpFormStep: Subject<SignUpFormStep> = new Subject<SignUpFormStep>();
  public signUpFormStep$ = this.signUpFormStep.asObservable();

  constructor(private formBuilder: FormBuilder) {
    this.signUpPersonalDataForm = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      cellphone: ['', Validators.minLength(11)],
      userName: ['', Validators.minLength(4)],
      email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
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

  public submitPersonalData(): void {
    this.signUpPersonalDataForm.markAllAsTouched();

    if (this.signUpPersonalDataForm.valid) {
      this.signUpFormStep.next(SignUpFormStep.Address);
    }
  }
}
