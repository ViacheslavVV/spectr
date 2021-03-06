import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../service/authService';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
  	let isLogged : boolean = this.authService.isLoggedIn();
  	if (!isLogged) {
  		this.router.navigate(['login']);
  	}
    return isLogged;
  }
}