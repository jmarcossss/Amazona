import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-users',

  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: UserModel[] = [];
  userFormGroup = new FormGroup({
    name: new FormControl(),
  });

  addUser() {}
}
