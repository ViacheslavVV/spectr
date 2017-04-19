import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/authService';

@Component({
  selector: 'sign-up',
  providers: [AuthService],
  templateUrl: '../../pages/component/signUp.html'
})
export class SignUpComponent {
  public userSignUpData : UserSignUpData = new UserSignUpData();

  private _errPresent : boolean = false;
  private loginExists : string = 'Логин занят!';
  private serverErrorMsg : string = 'Ошибка сервера!';
  private errText : string;
  constructor(private authService: AuthService, private router: Router) {}

  public signUp() {
    if (this.userSignUpData.isValid()) {
        this.authService.checkLogin(this.userSignUpData.loginName).subscribe(result => result ? this.onValidSignUp() : this.loginExistsFail(), 
        error => this.signUpAppFail());      
    }
  }

  private onValidSignUp() : void {
    this.authService.signUp(this.userSignUpData).subscribe(data => data ? this.signUpOk() : this.signUpFail(), error => this.signUpAppFail());
  }

  private signUpOk() : void {
    this.router.navigate(['login']);
  }

  private signUpFail() : void {
    this._errPresent = true;
    this.errText = this.serverErrorMsg;
  }

  private signUpAppFail() : void {
    this._errPresent = true;
    this.errText = this.serverErrorMsg;
  }

  private loginExistsFail() : void {
    this._errPresent = true;
    this.errText = this.loginExists;
  }

  isError() : boolean {
    return this._errPresent;
  }

  toLoginPage() {
    this.router.navigate(['login']);
  }
}

export class UserSignUpData {
  public loginName : string;
  public password : string;
  public name : string;
  public lastName : string;
  public email : string;

  isValid() : boolean {
    return true;
  }
}