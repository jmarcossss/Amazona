import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  Data: Date = new Date();

  dataSelecionada(selectedDate: Date){
    this.Data = selectedDate;
  }

}
