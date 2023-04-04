import { Component, OnInit } from '@angular/core';
import { SignUpFormStep } from './enums/sign-up-form-step.enum';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpFormStep!: SignUpFormStep;

  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.signUpService.signUpFormStep$.subscribe((signUpFormStep) => {
      this.signUpFormStep = signUpFormStep;
    });
  }
}
