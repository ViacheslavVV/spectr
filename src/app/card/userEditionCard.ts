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
  public user : AppUserInfo = new AppUserInfo();

  constructor(private authService: AuthService, private router: Router) {
    authService.getUserByLogin(localStorage.getItem('login')).subscribe(data => this.user = data.json());
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
  
}