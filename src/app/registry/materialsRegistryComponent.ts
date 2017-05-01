import { Component, Directive, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Calendar } from 'primeng/primeng';
import { MaterialsService } from '../service/materialsService';
import { GlobalSettings } from '../service/globalSettings';
import { FileItem, FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Observable } from 'rxjs/Observable';

const URL = GlobalSettings.SERVER_ADDRESS+'/files/upload';

@Component({
  selector: '<materials>',
  templateUrl: '../pages/materialsRegistryComponent.html',
  providers: [ MaterialsService ]
})
export class MaterialsRegistryComponent implements AfterViewInit, OnInit {

  errorMessage: string;
  data: any[];
  mode = 'Observable';
  filter: Filter;

  constructor (private materialsService: MaterialsService) {
    this.filter = new Filter();
  }  

  ngAfterViewInit() {
  }  

  ngOnInit() { this.getMaterials(); }

   getMaterials() {
     console.log("getMateriasl component");
    this.materialsService.getMaterials(this.filter)
                     .subscribe(
                       data => this.data = data,
                       error =>  this.errorMessage = <any>error);
  }
}

export class Filter  {
    name : String = null;
    probeDate : Date = null;
    probePlace : String = null;
    description : String = null;

    public getAsGetParams() : String {
       let result : String = "";
       let firstSymbol = "";
       let joinSymbol="&";

       if (this.isNotEmpty(this.name)) {
         result += "name="+this.name;
         firstSymbol = joinSymbol;
       }
       if (this.probeDate != null) {
         result += firstSymbol + "probeDate=" + this.probeDate.toLocaleDateString();
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.probePlace)) {
         result += firstSymbol + "probePlace="+this.probePlace;
         firstSymbol = joinSymbol;
       }
       if (this.isNotEmpty(this.description)) {
         result += firstSymbol + "description="+this.description;
       }
       return result;
    }

    private isNotEmpty(value : String) : boolean{
      return value != null && value != "";
    }
}
