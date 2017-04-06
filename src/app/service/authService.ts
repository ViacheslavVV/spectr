import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/buildMaterialsRegistryComponent';
import { BuildMaterial } from '../card/buildMaterialCard';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private loggedIn : boolean = false;

	private authUrl = GlobalSettings.SERVER_ADDRESS+"/login";  // url to get login
	constructor (private http: Http) {
	}


  public isLoggedIn() : boolean {
    return localStorage.getItem('loggedIn') == 'true';
  }

	public login(login : string, password : string) : Observable<boolean> {
    return this.http
      .post(
        '/login', 
        JSON.stringify({})
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }

  public loginSimple(login : string, password : string) : boolean {
    
    localStorage.setItem('login', login);
    localStorage.setItem('password', password);    
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('auth_token', '123123123123');
    console.log(localStorage);  
    this.loggedIn = true;
    console.log('loginSimple'+this.loggedIn);
    return true;
  }

  public logoutSimple() {
    localStorage.setItem('loggedIn', 'false');
  }
}