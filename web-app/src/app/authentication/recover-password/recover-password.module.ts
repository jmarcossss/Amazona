import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverPasswordService } from './recover-password.service';
import { RequestCodeComponent } from './request-code/request-code.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { RequestEmailComponent } from './request-email/request-email.component';


@NgModule({
  declarations:
   [RecoverPasswordComponent,
    RequestCodeComponent,
    RequestPasswordComponent,
    RequestEmailComponent,
    ],
  imports: [CommonModule, SharedModule],
    providers:[RecoverPasswordService],
})
export class RecoverPasswordModule {}
