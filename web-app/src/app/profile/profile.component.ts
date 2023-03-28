import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

 funcTest() {

    console.log("Button Clicked!");
  }

  funcTest2() {

    console.log("Button Clicked 2!");
  }


}
