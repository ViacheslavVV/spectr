import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { SpectrsService } from "../service/spectrsRegistryService";

@Component({
  selector: '<spectrs>',
  templateUrl: '../pages/spectrsRegistryComponent.html',
  providers: [ SpectrsService ]
})
export class SpectrsRegistryComponent implements OnInit  { 

  filter: Filter;
  data: any[];
  mode = 'Observable';
  errorMessage: string;

  constructor (private spectrService : SpectrsService) {
    this.filter = new Filter();
  }

  aa() {
    console.log(this.filter);
    console.log(this.filter.getAsGetParams());
    this.getSpectrs();
  }

  ngOnInit() { this.getSpectrs(); }

  getSpectrs() {
     console.log("getSpectrs component");
    this.spectrService.getSpectrs(this.filter)
                     .subscribe(
                       data => this.data = data,
                       error =>  this.errorMessage = <any>error);
  }
}

export class Filter  {
    waveLength : String = null;
    intensity : String = null;
    chemicalElementName : String = null;
    spectrLineName : String = null;

    public getAsGetParams() : String {
       let result : String = "";
       let firstSymbol = "";
       let joinSymbol="&";
       
       if (this.isNotEmpty(this.waveLength)) {
         result += "waveLength="+this.waveLength;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.intensity)) {
         result += firstSymbol + "intensity="+this.intensity;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.chemicalElementName)) {
         result += firstSymbol + "chemicalElementName="+this.chemicalElementName;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.spectrLineName)) {
         result += firstSymbol +"spectrLineName="+this.spectrLineName;
       }
       return result;
    }

    private isNotEmpty(value : String) : boolean{
      return value != null && value != "";
    }
}
