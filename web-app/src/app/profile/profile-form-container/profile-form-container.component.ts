import { Component } from '@angular/core';
import { ProfileForm } from '../enums/profile-form.enum';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-form-container',
  templateUrl: './profile-form-container.component.html',
  styleUrls: ['./profile-form-container.component.css'],
})
export class ProfileFormContainerComponent {
  profileForm: ProfileForm = ProfileForm.PersonalData;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.profileForm$.subscribe((profileForm: ProfileForm) => {
      this.profileForm = profileForm;
    });
  }
}
