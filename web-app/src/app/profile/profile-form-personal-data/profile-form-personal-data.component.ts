import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../profile.service';
import ValidatorsPattern from '../../shared/utils/validators-pattern';
import InputMask from '../../shared/utils/input-mask';

@Component({
  selector: 'app-profile-form-personal-data',
  templateUrl: './profile-form-personal-data.component.html',
  styleUrls: ['./profile-form-personal-data.component.css'],
})
export class ProfileFormPersonalDataComponent implements OnInit {
  profilePersonalDataForm!: FormGroup;
  cpfMask = InputMask.CPF;
  cellphoneMask = InputMask.CELLPHONE;

  constructor(
    public profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profilePersonalDataForm = this.profileService.profilePersonalDataForm;
  }
}
