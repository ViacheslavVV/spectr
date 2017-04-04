import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { BuildMaterialsService } from "../service/buildMaterialsService";


@Component({
  selector: '<build-materials>',
  templateUrl: '../pages/buildMaterialsRegistryComponent.html',
  providers: [ BuildMaterialsService ]
})
export class BuildMaterialsRegistryComponent implements OnInit { 
  filter : Filter;
  data: any[];
  mode = 'Observable';
  errorMessage: string;

  constructor(private buildMaterialsService : BuildMaterialsService) {
    this.filter = new Filter();
  }

  aa() {
    console.log(this.filter);
    console.log(this.filter.getAsGetParams());
    this.getBuildMaterials();
  }

  ngOnInit() { this.getBuildMaterials(); }

   getBuildMaterials() {
     console.log("getBuildMaterials component");
    this.buildMaterialsService.getBuildMaterials(this.filter)
                     .subscribe(
                       data => this.data = data,
                       error =>  this.errorMessage = <any>error);
  }
}

export class Filter  {
    creationDate : Date = null;
    name : String = null;
    manufacturerName : String = null;
    researchObjectTypeName : String = null;

    public getAsGetParams() : String {
       let result : String = "";
       let firstSymbol = "";
       let joinSymbol="&";

       if (this.creationDate != null) {
         result += "creationDate="+this.creationDate.toLocaleDateString();
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.name)) {
         result += firstSymbol + "name="+this.name;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.manufacturerName)) {
         result += firstSymbol + "manufacturerName="+this.manufacturerName;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.researchObjectTypeName)) {
         result += firstSymbol + "researchObjectTypeName="+this.researchObjectTypeName;
         firstSymbol = joinSymbol;
       }
       return result;
    }

    private isNotEmpty(value : String) : boolean{
      return value != null && value != "";
    }
}
