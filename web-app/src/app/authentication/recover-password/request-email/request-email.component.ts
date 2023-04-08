import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RecoverPasswordService } from '../recover-password.service';

@Component({
  selector: 'app-request-email',
  templateUrl: './request-email.component.html',
  styleUrls: ['./request-email.component.css']
})
export class RequestEmailComponent {

  recoverPasswordRequestEmailForm!: FormGroup;

}
