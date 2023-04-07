import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() onSearchChange: (value: String) => void = () => {};
  showNotification = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((_) => this.onListenerHome());
      // adiciona um event listener ao elemento document para fechar o menu quando o usuário clicar fora dele

    document.addEventListener('click', (event) => {
      if (!this.menuTrigger.menuOpen && this.showNotification) {
        this.showNotification = false;
      }
    });
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

    this.showNotification = !this.showNotification;
  }

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
}
