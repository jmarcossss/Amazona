import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignInModule } from './sign-in/sign-in.module';
import { RecoverPasswordModule } from './recover-password/recover-password.module';
import { SignUpModule } from './sign-up/sign-up.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    SignInModule,
    RecoverPasswordModule,
    SignUpModule,
  ],
})
export class AuthenticationModule {}
