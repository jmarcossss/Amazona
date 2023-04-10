import { Component, OnInit } from '@angular/core';
import { ApiMessageCodes } from '../../shared/utils/api-message-codes';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';
import { FormGroup } from '@angular/forms';
import { NotificationsService } from './notifications.services';
import { FormControl } from '@angular/forms';
import NotificationModel from 'src/app/models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  notificationForm!: FormGroup;
  notifications: NotificationModel[];
  Data: Date = new Date();

  constructor(
    private notificationService: NotificationsService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {
    this.notifications = []
  }

  ngOnInit() {
    this.clean()
    this.notificationForm = this.notificationService.notificationForm

    this.notificationService.notificationStatus$.subscribe((status) => {
      status.maybeMap({
        succeeded: (notifications: any[]) => {
          console.warn(notifications);
          this.notifications = notifications;
        },
        failed: (_) => {
          this.snackBarService.showError({
            message: 'error loading notifications',
          });
        },
      });
    });
  }
  
  public async clean(): Promise<void> {
    this.notificationService.clean()
    await this.buscar();
  }
  setAtivo(): void {
    this.notificationService.setAtivo();
  }
  setConcluido(): void {
    this.notificationService.setConcluido();
  } setCancelado(): void {
    this.notificationService.setCancelado();
  }
  
  public async buscar(selectedDate?: Date): Promise<void> {
    this.notifications = await this.notificationService.buscar(selectedDate);    
    console.log(this.notifications)
  }


  dataSelecionada(selectedDate: Date) {
    this.Data = selectedDate;
    this.buscar(selectedDate);
  }

}
