import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { EtalonSpectrsService } from "../service/etalonSpectrsService";

@Component({
  selector: '<etalon-spectrs>',
  templateUrl: '../pages/etalonSpectrRegistryComponent.html',
  providers: [ EtalonSpectrsService ]
})
export class EtalonSpectrsRegistryComponent implements OnInit  { 
  filter : Filter;
  data: any[];
  mode = 'Observable';
  errorMessage: string;
  currentImgSrc: string;
  
  constructor(private etalonSpectrService: EtalonSpectrsService) {
    this.filter = new Filter();
  }

  aa() {
    console.log(this.filter);
    console.log(this.filter.getAsGetParams());
    this.getEtalonSpectrs();
  }

  ngOnInit() { this.getEtalonSpectrs(); }

  getEtalonSpectrs() {
     console.log("getEtalogSpectrs component");
    this.etalonSpectrService.getEtalonSpectrs(this.filter)
                     .subscribe(
                       data => this.data = data,
                       error =>  this.errorMessage = <any>error);
  }

  imgClick(img : string) : void {
    this.currentImgSrc = img;
  }
}

export class Filter  {
    waveLength : String = null;
    buildMaterialName : String = null;
    materialName : String = null;
    chemicalElementName : String = null;
    spectrLinePersonName : String = null;

    public getAsGetParams() : String {
       let result : String = "";
       let firstSymbol = "";
       let joinSymbol="&";

       if (this.isNotEmpty(this.waveLength)) {
         result += "waveLength="+this.waveLength;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.buildMaterialName)) {
         result += firstSymbol + "buildMaterialName="+this.buildMaterialName;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.materialName)) {
         result += firstSymbol + "materialName="+this.materialName;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.chemicalElementName)) {
         result += firstSymbol + "chemicalElementName="+this.chemicalElementName;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.spectrLinePersonName)) {
         result +=  firstSymbol + "spectrLinePersonName="+this.spectrLinePersonName;
       }
       return result;
    }

    private isNotEmpty(value : String) : boolean{
      return value != null && value != "";
    }
}
