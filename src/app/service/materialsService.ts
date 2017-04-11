import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { Filter } from '../registry/materialsRegistryComponent';
import { HttpClient } from './httpClient';
import { Material } from '../card/materialCard';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MaterialsService {
  private createMaterialUrl : string = GlobalSettings.SERVER_ADDRESS+"/materials/add";
	private materialsUrl : string = GlobalSettings.SERVER_ADDRESS+"/materials/all";  // url to get all materials
	private materialsUrlWithParams : string = GlobalSettings.SERVER_ADDRESS + "/materials/filters"; 
	constructor (private http: HttpClient) {
	}

	private extractData(res: Response) {
    let body = res.json();
    return body || { };
  	}

	public getMaterials (filter : Filter): Observable<any[]> {
		console.log("getMaterials service");
    return this.http.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
  	}

  	private getUrlForFetchWithParams(filter : Filter) : string {
    	let params = filter.getAsGetParams(); 
    return params == "" ? this.materialsUrl : this.materialsUrlWithParams + "?"+params;
    }

  public createMaterial(material : Material) : Observable<Response> {
     return this.http.post(this.createMaterialUrl, material);
  }

}