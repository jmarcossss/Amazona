import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm!: FormGroup;


  constructor(private signInService: SignInService) {}

  ngOnInit() {
    this.signInForm = this.signInService.signInForm;
  }

  onSubmit(): void {
    this.signInService.submitForm();
  }

  }



