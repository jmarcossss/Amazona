import { Component, Input, OnInit } from '@angular/core';
import { ProfileForm } from '../enums/profile-form.enum';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-header-step',
  templateUrl: './profile-header-step.component.html',
  styleUrls: ['./profile-header-step.component.css'],
})
export class ProfileHeaderStepComponent implements OnInit {
  profileForm!: ProfileForm;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.profileForm$.subscribe((profileForm) => {
      this.profileForm = profileForm;
    });
  }

  public onClickHeader(form: number) {
    this.profileService.submitHeader(form);
  }
}
