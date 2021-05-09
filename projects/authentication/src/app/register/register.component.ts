import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public name = '';
  public role = '';
  public email = '';
  public password = '';

  public roleList = ['Admin', 'Customer'];

  private storageList: {
    name: string;
    role: string;
    email: string;
    password: string;
    isActive: boolean;
  }[] = [];

  public errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    const userList = this.cookieService.get('userList');
    if (userList) {
      this.storageList = JSON.parse(userList);
    }
  }

  registerHandler(): void {
    const isUserRegistered: boolean =
      !!this.storageList.length &&
      !!this.storageList.filter((user) => user.email === this.email).length;

    if (isUserRegistered) {
      this.errorMessage = 'This email is already registered. Please try different email address';
    } else {
      this.storageList.push({
        name: this.name,
        role: this.role,
        email: this.email,
        password: this.password,
        isActive: false
      });

      this.cookieService.set('userList', JSON.stringify(this.storageList));

      this.router.navigateByUrl('/login').then();
    }
  }

  checkFormValidity(): boolean {
    return !!this.name && !!this.role && !!this.email && !!this.password;
  }

}
