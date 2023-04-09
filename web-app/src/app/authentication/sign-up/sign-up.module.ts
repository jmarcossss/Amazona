import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SharedModule } from '../../shared/shared.module';
import { SignUpHeaderStepComponent } from './sign-up-header-step/sign-up-header-step.component';
import { SignUpFormContainerComponent } from './sign-up-form-container/sign-up-form-container.component';
import { SignUpFormPersonalDataComponent } from './sign-up-form-personal-data/sign-up-form-personal-data.component';
import { SignUpService } from './sign-up.service';
import { SignUpFormAddressComponent } from './sign-up-form-address/sign-up-form-address.component';
import { SignUpFormPaymentComponent } from './sign-up-form-payment/sign-up-form-payment.component';

@NgModule({
  declarations: [
    SignUpComponent,
    SignUpHeaderStepComponent,
    SignUpFormContainerComponent,
    SignUpFormPersonalDataComponent,
    SignUpFormAddressComponent,
    SignUpFormPaymentComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [SignUpService],
})
export class SignUpModule {}
