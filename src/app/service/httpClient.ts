import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClient {

  constructor (private http: Http) {
	}

  private addDefaultHeaders(headers : Headers) : void {
    headers.append('Auth_token', localStorage.getItem('auth_token'));
  }

  public get(url : string, headers? : Headers) : Observable<Response> {
    if (headers == null) {
      headers = new Headers();
    }
    this.addDefaultHeaders(headers);
    return this.http.get(url, { headers : headers });
  }

  public post(url : string, data : any, headers? : Headers) : Observable<Response> {
    if (headers == null) {
      headers = new Headers();
    }
    this.addDefaultHeaders(headers);
    return this.http.post(url, data, { headers : headers });
  }
}