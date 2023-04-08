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
  }
  public async clean(): Promise<void>{
    this.historyService.clean()
    await this.buscar();
  }
  setAtivo(): void{
    this.historyService.setAtivo();
  }
  setConcluido(): void{
    this.historyService.setConcluido();
  }setCancelado(): void{
    this.historyService.setCancelado();
  }
  public async buscar(): Promise<void>{
    this.orders = await this.historyService.buscar();
    console.log(this.orders)
  }
}
