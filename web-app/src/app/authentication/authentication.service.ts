import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import UserModel from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user: BehaviorSubject<UserModel | undefined> = new BehaviorSubject<
    UserModel | undefined
  >(undefined);

  public user$ = this.user.asObservable();

  constructor() {
    this.getUser();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const storageUser = localStorage.getItem('user');

    if (token || storageUser) {
      return true;
    }

    return false;
  }

  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public clear(): void {
    localStorage.clear();
  }

  public getUser(): UserModel | undefined {
    let userModel;
    let storageUser = localStorage.getItem('user');

    if (!!storageUser) {
      userModel = new UserModel(JSON.parse(storageUser));
      this.user.next(userModel);
    }

    return userModel;
  }
}
