import { Component, Directive, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Calendar } from 'primeng/primeng';
import { MaterialsService } from '../service/materialsService';
import { GlobalSettings } from '../service/globalSettings';
import { FileItem, FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { Modal } from 'ngx-modal';

const URL = GlobalSettings.SERVER_ADDRESS+'/files/upload';

@Component({
  selector: '<materials>',
  templateUrl: '../pages/materialsRegistryComponent.html',
  providers: [ MaterialsService, ToastyService ]
})
export class MaterialsRegistryComponent implements AfterViewInit, OnInit { 

  public uploader : FileUploader = new FileUploader({url: URL});

  fileItem : FileItem;

  public isEnabled() : boolean {
    return this.fileItem != null && this.fileItem.isError;
  }

  errorMessage: string;
  data: any[];
  mode = 'Observable';
  filter: Filter;
  public firstModal : Modal = new Modal();

  constructor (private materialsService: MaterialsService, public toastyService: ToastyService) {
    this.filter = new Filter();
  }  

  onUploadStart() {
    var toastOptions:ToastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла началась!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        
       this.toastyService.info(toastOptions);
  }

  onUploadSuccess() {
    var toastOptions:ToastOptions = {
            title: "Загрузка файла:",
            msg: "Файл успешно загружен!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        
       FileItem.prototype._form.toastyService.success(toastOptions);
  }

  onUploadError() {
    var toastOptions:ToastOptions = {
            title: "Загрузка файла:",
            msg: "Ошибка загрузки файла!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        
       FileItem.prototype._form.toastyService.error(toastOptions);
  }

  onUploadCancel() {
    var toastOptions:ToastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла отменена!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        
       FileItem.prototype._form.toastyService.error(toastOptions);
  }

  aa() {
    console.log(this.filter);
    console.log(this.filter.getAsGetParams());
    console.log(this.uploader);
    this.getMaterials();
  }

  uploadMyFile() : void {
    this.fileItem = this.uploader.queue[this.uploader.queue.length-1];
    FileItem.prototype._form = this;
    this.fileItem.onSuccess = this.onUploadSuccess;
    this.fileItem.onError = this.onUploadError;
    this.fileItem.onCancel = this.onUploadCancel;
    this.fileItem.upload();
    
    this.onUploadStart();
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
