import { Component } from '@angular/core';
import { AuthService } from './service/authService';
import { Router } from '@angular/router';
@Component({
  selector: 'top-menu',
  templateUrl: '../pages/TopMenuPanel.html',
  providers: [AuthService]
})
export class TopMenuPanelComponent  {

	public getUserLogin() : string {
		return localStorage.getItem('login');
	}

	public getUserFio() : string {
		return localStorage.getItem('fio');
	}

	public getEmail() : string {
		return localStorage.getItem('email');
	}

	constructor(private authService : AuthService, private router : Router) {
	}

	isLoggedIn() : boolean {
		return this.authService.isLoggedIn();
	}

	logOut() : void {
		this.authService.logout();
		this.router.navigate(['login']);
	}
}