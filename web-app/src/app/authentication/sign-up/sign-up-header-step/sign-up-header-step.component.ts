import { Component, Input, OnInit } from '@angular/core';
import { SignUpFormStep } from '../enums/sign-up-form-step.enum';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-sign-up-header-step',
  templateUrl: './sign-up-header-step.component.html',
  styleUrls: ['./sign-up-header-step.component.css'],
})
export class SignUpHeaderStepComponent implements OnInit {
  signUpFormStep: SignUpFormStep = SignUpFormStep.PersonalData;

  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.signUpService.signUpFormStep$.subscribe((signUpFormStep) => {
      this.signUpFormStep = signUpFormStep;
    });
  }
}
