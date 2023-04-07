import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Injectable({
  providedIn: 'root',
})

export class RecoverPasswordService  extends BaseService{


  constructor(){
    super()
  }
}
