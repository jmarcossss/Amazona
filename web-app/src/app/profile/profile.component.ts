import { Component, OnInit } from '@angular/core';
import { ProfileForm } from './enums/profile-form.enum';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: ProfileForm;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.profileForm$.subscribe((profileForm) => {
      this.profileForm = profileForm;
    });
  }

  public onClickDelete() {
    this.profileService.submitDelete();
  }

  public onClickSave() {
    this.profileService.submitSave();
  }
}
