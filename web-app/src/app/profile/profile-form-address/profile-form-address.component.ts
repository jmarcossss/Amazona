import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-form-address',
  templateUrl: './profile-form-address.component.html',
  styleUrls: ['./profile-form-address.component.css'],
})
export class ProfileFormAddressComponent implements OnInit {
  profileAddressForm!: FormGroup;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileAddressForm = this.profileService.profileAddressForm;
  }
}
