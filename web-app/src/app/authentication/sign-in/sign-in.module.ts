import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { SharedModule } from '../../shared/shared.module';
import { SignInService } from './sign-in.service';

@NgModule({
  declarations: [ SignInComponent],
  imports: [
    CommonModule, SharedModule],
    providers: [SignInService],


})
export class SignInModule { }
