import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/researchObjectsRegistryComponent';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ResearchObjectsService {

	private researchObjectsUrl = GlobalSettings.SERVER_ADDRESS + "/resobjects/all";  // url to get all research objects
	private researchObjectsUrlWithParams = GlobalSettings.SERVER_ADDRESS + "/resobjects/filters";

	constructor (private http: Http) {
	}

	private extractData(res: Response) {
    let body = res.json();
    return body || { };
  	}

	getResearchObjects (filter : Filter) : Observable<any[]> {
		console.log("getResearchObjects service");
    return this.http.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
  	}

  	private getUrlForFetchWithParams(filter : Filter) : string {
    	let params = filter.getAsGetParams(); 
    return params == "" ? this.researchObjectsUrl : this.researchObjectsUrlWithParams + "?"+params;
    }
}