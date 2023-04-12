import { Component, OnInit } from '@angular/core';
import { RecoverPasswordStep } from './enums/recover-password-step.enum';
import { RecoverPasswordService } from './recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: 'recover-password.component.html',
  styleUrls: ['recover-password.component.css'],
})
export class RecoverPasswordComponent implements OnInit {
  recoverPasswordStep: RecoverPasswordStep = RecoverPasswordStep.RequestEmail;

  constructor(private recoverPasswordService: RecoverPasswordService) {}

  ngOnInit() {
    this.recoverPasswordService.initState();

    this.recoverPasswordService.recoverPasswordStep.subscribe(
      (recoverPasswordStep) => {
        this.recoverPasswordStep = recoverPasswordStep;
      }
    );
  }
}
