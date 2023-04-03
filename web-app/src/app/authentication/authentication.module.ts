import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignUpModule } from './sign-up/sign-up.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    SignUpModule,
  ],
})
export class AuthenticationModule {}
