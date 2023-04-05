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
  deliveryDate: moment.Moment = moment().add(1, 'days');
  timeRemaining: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    interval(1000).subscribe(() => {
      this.timeRemaining = this.getTimeRemaining();
    });
  }

  getTimeRemaining() {
    const duration = moment.duration(this.deliveryDate.diff(moment()));
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return { days, hours, minutes, seconds };
  }
}