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
  private _errPresent : boolean = false;
  private incorrectDataMsg : string = 'Некорректные логин или пароль!';
  private serverErrorMsg : string = 'Ошибка сервера!';
  private errText : string;
  private forgottenPassword : string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log(localStorage);
    this.authService.login(this.loginName, this.password).subscribe(data => data ? this.loginOk() : this.loginFail(), error => this.loginAppFail());    
  }

  private loginOk() : void {
    this.router.navigate(['']);
  }

  private loginFail() : void {
    this._errPresent = true;
    this.errText = this.incorrectDataMsg;
  }

  private loginAppFail() : void {
    this._errPresent = true;
    this.errText = this.serverErrorMsg;
  }

  isError() : boolean {
    return this._errPresent;
  }

  toRegPage() {
    this.router.navigate(['signUp']);
  }

  restorePassword() : void {
    if (this.forgottenPassword != null && this.forgottenPassword != '') {
        this.authService.restorePassword(this.forgottenPassword);
        this.forgottenPassword = '';
      }
    }
  }

export class AppUserInfo {
  public login : string;
  public email : string;
  public firstName : string;
  public lastName : string;
}