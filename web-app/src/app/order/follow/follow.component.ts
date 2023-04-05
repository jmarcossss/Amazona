import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  orderId!: number; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id']; // colchetes para acessar a propriedade do id
  }
}
