import { Component, OnInit } from '@angular/core';
import { ApiMessageCodes } from '../../shared/utils/api-message-codes';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';
import { FormGroup } from '@angular/forms';
import { HistoryService } from './history.service';
import { FormControl } from '@angular/forms';
import OrderModel from 'src/app/models/order.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  historyForm!: FormGroup; 
  orders: OrderModel[];
  constructor(
    private historyService: HistoryService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {
    this.orders = []
  }
  ngOnInit() {
    this.clean()
    this.historyForm = this.historyService.historyForm

    this.historyService.historyStatus$.subscribe((status) => {
      status.maybeMap({
        succeeded: (orders: any[]) => {
          console.warn(orders);
          this.orders = orders;
        },
        failed: (_) => {
          this.snackBarService.showError({
            message: 'error loading orders',
          });
        },
      });
    });
  }
  public async clean(): Promise<void>{
    this.historyService.clean()
    await this.buscar();
  }
  setConfirmed(): void{
    this.historyService.setConfirmed();
  }
  setInTransit(): void{
    this.historyService.setInTransit();
  }
  setDelivered(): void{
    this.historyService.setDelivered();
  }
  setCanceled(): void{
    this.historyService.setCanceled();
  }
  checkRecomprar(currentOrder: string): boolean{
    return this.historyService.checkRecomprar(currentOrder)
  }
  checkAcompanharPedido(currentOrder: string): boolean{
    return this.historyService.checkAcompanharPedido(currentOrder)
  }
  checkNotaFiscal(currentOrder: string): boolean{
    return this.historyService.checkNotaFiscal(currentOrder)
  }
  checkCancelar(currentOrder: string): boolean{
    return this.historyService.checkCancelar(currentOrder)
  }
  public async buscar(): Promise<void>{
    this.orders = await this.historyService.buscar();
  }
}
