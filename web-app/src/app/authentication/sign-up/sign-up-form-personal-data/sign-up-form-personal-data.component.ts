import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignUpService } from '../sign-up.service';
import ValidatorsPattern from '../../../shared/utils/validators-pattern';
import InputMask from '../../../shared/utils/input-mask';

@Component({
  selector: 'app-sign-up-form-personal-data',
  templateUrl: './sign-up-form-personal-data.component.html',
  styleUrls: ['./sign-up-form-personal-data.component.css'],
})
export class SignUpFormPersonalDataComponent implements OnInit {
  signUpPersonalDataForm!: FormGroup;
  cpfMask = InputMask.CPF;
  cellphoneMask = InputMask.CELLPHONE;
  passwordPattern = ValidatorsPattern.PASSWORD;

  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.signUpPersonalDataForm = this.signUpService.signUpPersonalDataForm;
  }

  onSubmit(): void {
    this.signUpService.submitPersonalData();
  }
}
