import { Component } from '@angular/core';
import { SignUpFormStep } from '../enums/sign-up-form-step.enum';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-sign-up-form-container',
  templateUrl: './sign-up-form-container.component.html',
  styleUrls: ['./sign-up-form-container.component.css'],
})
export class SignUpFormContainerComponent {
  signUpFormStep: SignUpFormStep = SignUpFormStep.PersonalData;

  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.signUpService.signUpFormStep$.subscribe((signUpFormStep) => {
      this.signUpFormStep = signUpFormStep;
    });
  }
}
