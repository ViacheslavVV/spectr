import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { HttpClient } from './httpClient';
import { DropdownItem } from '../component/multiselectComponent';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DropdownProviderService {

	private materialsDropdownUrl = GlobalSettings.SERVER_ADDRESS + "/materials/dropdown";  // url to get all build materials
	private manufacturersDropdownUrl = GlobalSettings.SERVER_ADDRESS + "/manufacturers/dropdown";
  private researchObjectTypesUrl = GlobalSettings.SERVER_ADDRESS+"/researchObjTypes/dropdown"; 
  private qualityStandartssUrl = GlobalSettings.SERVER_ADDRESS+"/qualitys/dropdown"; 

	constructor ( private httpClient : HttpClient) {
	}

  getMaterials() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.materialsDropdownUrl).map(this.extractData);
  }

  getManufacturers() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.manufacturersDropdownUrl).map(this.extractData);
  }

  getResearchObjecTypes() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.researchObjectTypesUrl).map(this.extractData);
  }

  getQualityStandarts() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.qualityStandartssUrl).map(this.extractData);
  }

	private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}