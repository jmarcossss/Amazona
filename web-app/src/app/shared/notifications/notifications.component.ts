import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../services/snack-bar.service';
import { FormGroup } from '@angular/forms';
import { NotificationsService } from './notifications.services';
import NotificationModel from 'src/app/models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notificationForm!: FormGroup;
  notifications: NotificationModel[];
  Data: Date = new Date();

  constructor(
    private notificationService: NotificationsService,
    private snackBarService: SnackBarService
  ) {
    this.notifications = [];
  }

  ngOnInit() {
    this.clean();
    this.notificationForm = this.notificationService.notificationForm;

    this.notificationService.notificationStatus$.subscribe((status) => {
      status.maybeMap({
        succeeded: (notifications: any[]) => {
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
    this.notificationService.clean();
    await this.buscar();
  }
  setAtivo(): void {
    this.notificationService.setAtivo();
  }
  setConcluido(): void {
    this.notificationService.setConcluido();
  }
  setCancelado(): void {
    this.notificationService.setCancelado();
  }

  public async buscar(selectedDate?: Date): Promise<void> {
    this.notifications = await this.notificationService.buscar(selectedDate);
    const data1 = selectedDate?.toISOString();
    const data2 = new Date(this.notifications[0].date);
    const data3 = data2.toISOString();

    if (!!selectedDate && !(data3 == data1)) {
      let aux: NotificationModel[] = [];
      this.notifications = aux;
    }
  }

  dataSelecionada(selectedDate: Date) {
    selectedDate.setHours(selectedDate.getHours() + 3);
    this.buscar(selectedDate);
  }
}
