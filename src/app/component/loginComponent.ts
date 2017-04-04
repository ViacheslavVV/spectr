import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/authService';

@Component({
  selector: 'login',
  providers: [AuthService],
  template: `LoginComponent`
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(login : string, password : string) {
    this.authService.login(login, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }
}