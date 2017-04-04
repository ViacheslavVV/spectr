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
export class BuildMaterialsService {

	private buildMaterialsUrl = GlobalSettings.SERVER_ADDRESS+"/bmaterials/all";  // url to get all build materials
	private buildMaterialsUrlWithParams = GlobalSettings.SERVER_ADDRESS+"/bmaterials/filters";
	constructor (private http: Http) {
	}

	private extractData(res: Response) {
    let body = res.json();
    return body || { };
  	}

	getBuildMaterials (filter : Filter): Observable<any[]> {
		console.log("getBuildMaterials service");
    return this.http.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
  	}

  	private getUrlForFetchWithParams(filter : Filter) : string {
    	let params = filter.getAsGetParams(); 
    return params == "" ? this.buildMaterialsUrl : this.buildMaterialsUrlWithParams + "?" + params;
    }

    public createBuildMaterial(buildMaterial : BuildMaterial) : void {
    	console.log('buildMaterial create');
    }
}