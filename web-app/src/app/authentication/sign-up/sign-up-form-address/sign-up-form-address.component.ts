import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form-address',
  templateUrl: './sign-up-form-address.component.html',
  styleUrls: ['./sign-up-form-address.component.css'],
})
export class SignUpFormAddressComponent implements OnInit {
  signUpAddressForm!: FormGroup;

  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.signUpAddressForm = this.signUpService.signUpAddressForm;
  }

  onSubmit(): void {
    this.signUpService.submitAddress();
  }

  onBack(): void {
    this.signUpService.backFromAddress();
  }
}
