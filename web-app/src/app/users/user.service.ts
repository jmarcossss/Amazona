import { Injectable } from '@angular/core';

import { BaseService } from '../services/base.service';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private prefix: string = '/users';

  constructor(private httpService: HttpService) {
    super();
  }
}
