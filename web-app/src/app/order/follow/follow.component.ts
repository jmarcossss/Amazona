import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { interval } from 'rxjs';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  orderId!: number;
  deliveryDate: moment.Moment = moment().add(4, 'minutes');
  timeRemaining: any = {};
  status = 'Confirmado';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    interval(1000).subscribe(() => {
      this.timeRemaining = this.getTimeRemaining();
    });
  }

  getTimeRemaining() {
    const now = moment();
    const duration = moment.duration(this.deliveryDate.diff(now));
    const minutes = duration.asMinutes();

    if (minutes > 2) {
      this.status = 'Confirmado';
    } else if (minutes <= 2 && minutes > 1) {
      this.status = 'Em trânsito';
    } else {
      this.status = 'Entregue';
    }

    const days = duration.days();
    const hours = duration.hours();
    let minutesRemaining = duration.minutes();
    const seconds = duration.seconds();

    if (duration.asSeconds() > 0) {
      minutesRemaining = minutesRemaining < 0 ? 0 : minutesRemaining;
      const timeRemaining = { days, hours, minutes: minutesRemaining, seconds };
      return timeRemaining;
    } else {
      const timeRemaining = { days, hours, minutes: 0, seconds: 0 };
      this.status = 'Entregue';
      return timeRemaining;
    }
  }
}