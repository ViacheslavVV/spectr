import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/buildMaterialsRegistryComponent';
import { BuildMaterial } from '../card/buildMaterialCard';
import { HttpClient } from './httpClient';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class BuildMaterialsService {

	private buildMaterialsUrl = GlobalSettings.SERVER_ADDRESS + "/bmaterials/all";  // url to get all build materials
	private buildMaterialsUrlWithParams = GlobalSettings.SERVER_ADDRESS + "/bmaterials/filters";
  private createBuildMaterialUrl : string = GlobalSettings.SERVER_ADDRESS+"/bmaterials/add"; 

	constructor ( private httpClient : HttpClient) {
	}

	private extractData(res: Response) {
    let body = res.json();
    return body || { };
  	}

	getBuildMaterials (filter : Filter): Observable<any[]> {
		console.log("getBuildMaterials service");
    return this.httpClient.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
  	}

  	private getUrlForFetchWithParams(filter : Filter) : string {
    	let params = filter.getAsGetParams(); 
    return params == "" ? this.buildMaterialsUrl : this.buildMaterialsUrlWithParams + "?" + params;
    }

    public createBuildMaterial(buildMaterial : BuildMaterial) : Observable<any> {
    	console.log('buildMaterial create');
      return this.httpClient.post(this.createBuildMaterialUrl, buildMaterial);
    }
}