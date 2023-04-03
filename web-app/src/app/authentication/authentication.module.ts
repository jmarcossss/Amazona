import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignInModule } from './sign-in/sign-in.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    SignInModule],
})
export class AuthenticationModule {}
