import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/etalonSpectrsRegistryComponent';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EtalonSpectrsService {

	private etalonSpectrsUrl = GlobalSettings.SERVER_ADDRESS + "/etspectrs/all";  // url to get all etalon spectrs
	private etalonSpectrsUrlWithParams = GlobalSettings.SERVER_ADDRESS+ "/etspectrs/filters";
	constructor (private http: Http) {
	}

	private extractData(res: Response) {
    let body = res.json();
    return body || { };
  	}

	getEtalonSpectrs (filter : Filter) : Observable<any[]> {
		console.log("getEtalonSpectrs service");
    return this.http.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
  	}

  	private getUrlForFetchWithParams(filter : Filter) : string {
    	let params = filter.getAsGetParams(); 
    return params == "" ? this.etalonSpectrsUrl : this.etalonSpectrsUrlWithParams + "?"+params;
    }
}