import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { ResearchObjectsService } from "../service/researchObjectsService";


@Component({
  selector: '<research-objects>',
  templateUrl: '../pages/researchObjectsRegistryComponents.html',
  providers: [ ResearchObjectsService ]
})
export class ResearchObjectsRegistryComponent implements OnInit  { 

  filter: Filter;
  data: any[];
  mode = 'Observable';
  errorMessage: string;

  constructor (private researchObjectService : ResearchObjectsService) {
    this.filter = new Filter();
  }

  aa() {
    console.log(this.filter);
    console.log(this.filter.getAsGetParams());
    this.getResearchObjects();
  }

	ngOnInit() { this.getResearchObjects(); }

  getResearchObjects() {
     console.log("getResearchObjects component");
    this.researchObjectService.getResearchObjects(this.filter)
                     .subscribe(
                       data => this.data = data,
                       error =>  this.errorMessage = <any>error);
  }
}

export class Filter  {
    name : String = null;
    date : Date = null;
    organizationName : String = null;
    description : String = null;

    public getAsGetParams() : String {
       let result : String = "";
       let firstSymbol = "";
       let joinSymbol="&";

       if (this.isNotEmpty(this.name)) {
         result += "name="+this.name;
         firstSymbol = joinSymbol;
       }
       if (this.date != null) {
         result += firstSymbol + "date="+this.date.toLocaleDateString();
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.organizationName)) {
         result += firstSymbol + "organizationName="+this.organizationName;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.description)) {
         result += firstSymbol +"description="+this.description;
       }
       return result;
    }

    private isNotEmpty(value : String) : boolean{
      return value != null && value != "";
    }
}
