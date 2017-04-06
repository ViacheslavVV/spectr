import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { HttpClient } from './httpClient';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SpectrsService {

	private spectrsUrl = GlobalSettings.SERVER_ADDRESS + "/spectra/all";  // url to get all spectrs
	private spectrsUrlWithParams = GlobalSettings.SERVER_ADDRESS + "/spectra/filters"; // url to get all with filters

	constructor (private http: HttpClient) {
	}

	private extractData(res: Response) {
    let body = res.json();
    return body || { };
  	}

	getSpectrs (filter : any) : Observable<any[]> {
		console.log("getSpectrs service");
    return this.http.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
	}

    private getUrlForFetchWithParams(filter : any) : string {
    	let params = filter.getAsGetParams();
    return params == "" ? this.spectrsUrl : this.spectrsUrlWithParams + "?"+params;
    }
}
