import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileHeaderStepComponent } from './profile-header-step/profile-header-step.component';
import { ProfileFormContainerComponent } from './profile-form-container/profile-form-container.component';
import { ProfileFormPersonalDataComponent } from './profile-form-personal-data/profile-form-personal-data.component';
import { ProfileService } from './profile.service';
import { ProfileFormAddressComponent } from './profile-form-address/profile-form-address.component';
import { ProfileFormDeleteComponent } from './profile-form-delete/profile-form-delete.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileHeaderStepComponent,
    ProfileFormContainerComponent,
    ProfileFormPersonalDataComponent,
    ProfileFormAddressComponent,
    ProfileFormDeleteComponent
  ],
  imports: [CommonModule, SharedModule],
  providers: [ProfileService],
})

export class ProfileModule {}