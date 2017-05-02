import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserInfo } from '../component/loginComponent';
import { AuthService } from '../service/authService';

@Component({
  selector: 'user-edit',
  providers: [AuthService],
  templateUrl: '../../pages/card/userEditionCard.html'
})
export class UserEditionCard {

  public userCurPass : string;
  public userNewPass : string;
  public userNewPassApprove : string;
  public changePassMsgErrPresent : boolean = false;
  public changePassMsgSuccessPresent : boolean = true;
  public changePassMsg : string;
  public changePassErrMsg : string = 'Ошибка при смене пароля!';
  public changePassSuccessMsg : string = 'Пароль успешно изменен!';

  public user : AppUserInfo = new AppUserInfo();

  constructor(private authService: AuthService, private router: Router) {
    authService.getUserByLogin(localStorage.getItem('login')).subscribe(data => this.user = data.json());
  }

  public changePassword() : void {
    this.authService.updatePass(this.userNewPass).subscribe(res => {
      if (res) {
        this.onChangeSuccess();
      } else {
        this.onChangeError();
      }
    }, error => this.onChangeError());
  }

  public onSave() : void {
    this.authService.updateUser(this.user).subscribe(res => {
      if (res) {
        this.onClose();
      } else {
        this.onError();
      } 
    }, error => this.onError());
    
  }

  public onError() : void {
    alert('Ошибка при сохранении данных!');
  }

  public onClose() : void {
    this.router.navigate(['']);
  }
  
  public changePasswordDisabled() : boolean {
    return !(this.strIsNotEmpty(this.userCurPass) && this.strIsNotEmpty(this.userNewPass) && this.userNewPass === this.userNewPassApprove);
  }

  private onChangeSuccess() {
    this.changePassMsgErrPresent = false;
    this.changePassMsgSuccessPresent = true;
    this.changePassMsg = this.changePassSuccessMsg;
  }

  public changePassErr() : boolean {
    return this.changePassMsgErrPresent == true && this.changePassMsg != null;
  }

  public changePassSuccess() : boolean {
    return this.changePassMsgSuccessPresent == true && this.changePassMsg != null;
  }

  private onChangeError() {
    this.changePassMsgErrPresent = true;
    this.changePassMsgSuccessPresent = false;
    this.changePassMsg = this.changePassErrMsg;
  }

  private strIsNotEmpty(str : string) : boolean {
    return str != null && str != '';
  }
}