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

	private materialsDropdownUrl = GlobalSettings.SERVER_ADDRESS + "/materials/idname";
  private buildMaterialsDropdownUrl = GlobalSettings.SERVER_ADDRESS + "/bmaterials/idname";
	private manufacturersDropdownUrl = GlobalSettings.SERVER_ADDRESS + "/manufacturers/idname";
  private researchObjectsUrl = GlobalSettings.SERVER_ADDRESS+"/resobjects/idname"; 
  private qualityStandartsUrl = GlobalSettings.SERVER_ADDRESS+"/qstandarts/idname"; 
  private researchPassportsUrl = GlobalSettings.SERVER_ADDRESS+"/rpass/idname"
  private chemicalElementsUrl = GlobalSettings.SERVER_ADDRESS+"/chemelem/idname";
  private spectrLinesUrl = GlobalSettings.SERVER_ADDRESS+"/sline/idname";
  private organizationsUrl = GlobalSettings.SERVER_ADDRESS + "/organization/idname";
  private resMethodsUrl = GlobalSettings.SERVER_ADDRESS + "/resmethod/idname";
  private resPasportFileUrl = GlobalSettings.SERVER_ADDRESS + "/specfiles";

	constructor ( private httpClient : HttpClient) {
	}

  getMaterials() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.materialsDropdownUrl).map(this.extractData);
  }

  getBuildMaterials() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.buildMaterialsDropdownUrl).map(this.extractData);
  }

  getManufacturers() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.manufacturersDropdownUrl).map(this.extractData);
  }

  getResearchObjecs() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.researchObjectsUrl).map(this.extractData);
  }

  getQualityStandarts() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.qualityStandartsUrl).map(this.extractData);
  }

  getResearchPassports() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.researchPassportsUrl).map(this.extractData);
  }

  getChemicalElements() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.chemicalElementsUrl).map(this.extractData);
  }

  getSpectrLines() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.spectrLinesUrl).map(this.extractData);
  }

  getOrganizations() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.organizationsUrl).map(this.extractData);
  }

  getResearchMethods() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.resMethodsUrl).map(this.extractData);
  }

  getResearchPassportFiles() : Observable<DropdownItem[]> {
    return this.httpClient.get(this.resPasportFileUrl).map(this.extractData);
  }

	private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}