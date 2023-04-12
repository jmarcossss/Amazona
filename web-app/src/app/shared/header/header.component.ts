import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() onSearchChange: (value: String) => void = () => {};
  showNotification = false;
  cartSubscription!: Subscription;
  cartItems = 0;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((_) => this.onListenerHome());
    // adiciona um event listener ao elemento document para fechar o menu quando o usuário clicar fora dele

    document.addEventListener('click', (event) => {
      if (!this.menuTrigger.menuOpen && this.showNotification) {
        this.showNotification = false;
      }
    });

    this.cartSubscription = this.shoppingCartService.cart$.subscribe((cart) => {
      this.cartItems = cart.length;
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
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
