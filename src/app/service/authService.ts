import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/buildMaterialsRegistryComponent';
import { BuildMaterial } from '../card/buildMaterialCard';
import { HttpClient } from '../service/httpClient';
import { UserSignUpData } from '../component/signUpComponent';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	private authUrl : string = GlobalSettings.SERVER_ADDRESS+"/au/login";  // url to get login
  private loginCheckUrl : string = GlobalSettings.SERVER_ADDRESS+"/au/check";
  private signUpUrl : string = GlobalSettings.SERVER_ADDRESS+"/au/reg"; 
  private logoutUrl : string = GlobalSettings.SERVER_ADDRESS + "/au/logout";
  private restorePasswordUrl : string = GlobalSettings.SERVER_ADDRESS + "/au/restore";
	constructor (private http: HttpClient) {
	}


  public isLoggedIn() : boolean {
    return localStorage.getItem('loggedIn') == 'true';
  }

	public login(login : string, password : string) : Observable<boolean> {
    let headers = new Headers();
    headers.append('login', login);
    headers.append('password', password);
    return this.http
      .post(
        this.authUrl, 
        {}, headers
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success == true || res.success == 'true') {
          localStorage.setItem('auth_token', res.authToken);
          localStorage.setItem('loggedIn', 'true');
          return true;
        }

        return false;
      });
  }

  public logout() {
    localStorage.setItem('loggedIn', 'false');
    this.http.post(this.logoutUrl, {}).subscribe(data => console.log('loggedOut'));
    localStorage.removeItem('auth_token');
  }

  public checkLogin(login : string) : Observable<boolean> {
    return this.http.post(this.loginCheckUrl, login).map(res => res.json());
  }

  public signUp(userSignUpData : UserSignUpData) : Observable<boolean> {
    return this.http.post(this.signUpUrl, userSignUpData).map(res => res.json());
  }

  public restorePassword(login : string) {
    this.http.post(this.restorePasswordUrl, login).subscribe();
  }
}