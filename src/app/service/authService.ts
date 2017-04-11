import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/buildMaterialsRegistryComponent';
import { BuildMaterial } from '../card/buildMaterialCard';
import { HttpClient } from '../service/httpClient';



import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	private authUrl : string = GlobalSettings.SERVER_ADDRESS+"/login/auth";  // url to get login
	constructor (private http: HttpClient) {
	}


  public isLoggedIn() : boolean {
    return true;
    //return localStorage.getItem('loggedIn') == 'true';
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
    localStorage.removeItem('auth_token');
  }
}