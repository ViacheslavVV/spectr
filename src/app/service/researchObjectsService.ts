import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/researchObjectsRegistryComponent';
import { HttpClient } from './httpClient';
import { ResearchObject } from '../card/researchObjectCard';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ResearchObjectsService {

	private researchObjectsUrl = GlobalSettings.SERVER_ADDRESS + "/resobjects/all";  // url to get all research objects
	private researchObjectsUrlWithParams = GlobalSettings.SERVER_ADDRESS + "/resobjects/filters";
  private createResearchObjectUrl = GlobalSettings.SERVER_ADDRESS + "/resobjects/add"

	constructor (private http: HttpClient) {
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

    public createResearchObject(researchObject : ResearchObject) {
      return this.http.post(this.createResearchObjectUrl, researchObject);
    }
}