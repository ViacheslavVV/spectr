import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/etalonSpectrsRegistryComponent';
import { HttpClient } from './httpClient';
import { EtalonSpectr } from '../card/etalonSpectrCard';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EtalonSpectrsService {

  private createEtalonSpectrUrl = GlobalSettings.SERVER_ADDRESS + "/etspectrs/add";
	private etalonSpectrsUrl = GlobalSettings.SERVER_ADDRESS + "/etspectrs/all";  // url to get all etalon spectrs
	private etalonSpectrsUrlWithParams = GlobalSettings.SERVER_ADDRESS+ "/etspectrs/filters";
	constructor (private http: HttpClient) {
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

    public createEtalonSpectr(spectr : EtalonSpectr) : Observable<Response> {
      return this.http.post(this.createEtalonSpectrUrl, spectr);
    }
}