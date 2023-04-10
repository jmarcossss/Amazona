import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import OrderModel from '../../models/order.model';
import { distinctUntilChanged } from 'rxjs';
import { SnackBarService } from '../../services/snack-bar.service';
import { ApiMessageCodes } from '../../shared/utils/api-message-codes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  @Input() activeOrder!: Partial<OrderModel>;

  constructor(
    public shoppingCartService: ShoppingCartService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeOrder = this.shoppingCartService.getActiveOrder();

    this.shoppingCartService.orderStatus$
      .pipe(distinctUntilChanged((a, b) => a.status === b.status))
      .subscribe((status) => {
        status.maybeMap({
          failed: (error) => {
            this.snackBarService.showError({
              message:
                error.msg ??
                ApiMessageCodes.codeToMessage(
                  Array.isArray(error.msgCode)
                    ? error.msgCode[0]
                    : error.msgCode
                ),
            });
          },
          succeeded: (_) => {
            this.snackBarService.showSuccess({
              message: 'Pedido realizado com sucesso!',
            });

            this.router.navigate(['/']);
          },
        });
      });
  }

  async createOrder() {
    await this.shoppingCartService.createOrder();
  }
}
