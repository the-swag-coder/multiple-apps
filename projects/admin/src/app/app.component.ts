import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public getUserDetails: {
    name: string;
    role: string;
    email: string;
    password: string;
    isActive: boolean;
  };
  private storageList: {
    name: string;
    role: string;
    email: string;
    password: string;
    isActive: boolean;
  }[] = [];

  constructor(
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    const userList = this.cookieService.get('userList');

    if (userList) {
      this.storageList = JSON.parse(userList);
      this.getUserDetails = this.storageList.find((user) => user.isActive);

      if (!this.getUserDetails || !this.getUserDetails.isActive) {
        window.location.href = environment.AUTHENTICATION_URL;
      }

      if (this.getUserDetails.role === 'Customer') {
        window.location.href = environment.CUSTOMER_URL;
      }
    } else {
      window.location.href = environment.AUTHENTICATION_URL;
    }
  }

  logout(): void {
    this.storageList.map((user) => {
      user.isActive = false;
      return user;
    });

    this.cookieService.set(
      'userList',
      JSON.stringify(this.storageList)
    );
    window.location.href = environment.AUTHENTICATION_URL;
  }

}
