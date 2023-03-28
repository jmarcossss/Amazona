import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() onSearchChange: (value: String) => void = () => {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((_) => this.onListenerHome());
  }

  onListenerHome() {
    const visibleClass = 'header-store-section-visible';
    const storeHeader = document.querySelector('.header-store-section');

    if (this.router.url === '/') {
      storeHeader?.classList.add(visibleClass);
    } else {
      storeHeader?.classList.remove(visibleClass);
    }
  }

  onSearchChangeHandler(value: String) {
    this.onSearchChange(value);
  }

  onClickNotification() {
    alert('Open notification');
  }
}
