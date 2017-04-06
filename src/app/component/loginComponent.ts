import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/authService';

@Component({
  selector: 'login',
  providers: [AuthService],
  templateUrl: '../../pages/component/loginPage.html'
})
export class LoginComponent {
  public loginName : string;
  public password : string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log(localStorage);
    this.authService.loginSimple(this.loginName, this.password);
    this.router.navigate(['']);
    // this.authService.login(thisloginName, password).subscribe((result) => {
    //   if (result) {
    //     this.router.navigate(['']);
    //   }
    // });
  }
}