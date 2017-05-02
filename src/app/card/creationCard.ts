import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CreationsService } from "../service/creationService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';
import { DropdownProviderService } from '../service/dropdownProviderService';

import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { FileItem, FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: '<creation-card>',
  templateUrl: '../../pages/card/creationCard.html',
  providers: [ CreationsService, ToastyService ]
})
export class CreationComponent {

	private fileUploadUrl = '/files/upload';

	public uploader : FileUploader = new FileUploader({url : this.fileUploadUrl});

  	fileItem : FileItem;

	/**
	 * Тип загружаемого файла
	 */
	fileType : string;

	/**
	 * Алиас загружаемого файла
	 */
	fileName : string;

	types : Array<any> = [{value : 'ATTACHMENT', name: 'Приложение'}, {value : 'RESEARCH_PASSPORT', name: 'Паспорт исследования'}, {value : 'SPECTR', name: 'Спектр'}];

	/**
	 * данные для выпадающего списка (attachmentResearchObjectId)
	 */
	attachmentResearchObjectsData : Array<DropdownItem> = new Array<DropdownItem>();
	attachmentResearchObject :  Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (attachmentFileId)
	 */
	attachmentFilesData : Array<DropdownItem> = new Array<DropdownItem>();
	attachmentFile :  Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (resPassResMethodId)
	 */
	resPassResMethodsData : Array<DropdownItem> = new Array<DropdownItem>();
	resPassResMethod :  Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (resPassResObjectId)
	 */
	resPassResObjectsData : Array<DropdownItem> = new Array<DropdownItem>();
	resPassResObject :  Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (resPassFileId)
	 */
	resPassFilesData : Array<DropdownItem> = new Array<DropdownItem>();
	resPassFile :  Array<DropdownItem> = [];

	constructor(private creationsService : CreationsService, private dropdownProviderService : DropdownProviderService, private router : Router, private toastyService : ToastyService) {
		this.refreshDropdowns();
	}

	/**
	 * Обновить данные выпадающих списков
	 */
	private refreshDropdowns() : void {
		//TODO для 2 выпадающих списков файлов
		this.dropdownProviderService.getResearchMethods().subscribe(data => this.resPassResMethodsData =  data , error => this.resPassResMethodsData = new Array<DropdownItem>());
		this.dropdownProviderService.getResearchObjecs().subscribe(data => this.resPassResObjectsData =  data , error => this.resPassResObjectsData = new Array<DropdownItem>());
		this.dropdownProviderService.getResearchObjecs().subscribe(data => this.attachmentResearchObjectsData =  data , error => this.attachmentResearchObjectsData = new Array<DropdownItem>());
	}

	public qualityStandart = new QualityStandart();
	createQualityStandart() : void {
		this.creationsService.createQualityStandart(this.qualityStandart);
	}

	public researchObjectType = new ResearchObjectType();
	createResearchObjectType() : void {
		this.creationsService.createResearchObjectType(this.researchObjectType);
	}

	public manufacturer = new Manufacturer();
	createManufacturer() : void {
		this.creationsService.createManufacturer(this.manufacturer);
	}

	public organization = new  Organization();
	createOrganization() : void {
		this.creationsService.createOrganization(this.organization);
	}

	public attachment = new Attachment();
	createAttachment() : void {
		this.attachment.researchObject = this.getFirstIdOrNull(this.attachmentResearchObject);
		this.attachment.fileId = this.getFirstIdOrNull(this.attachmentFile);
		this.creationsService.createAttachment(this.attachment);
	}

	public researchPassport = new ResearchPassport();
	createResearchPassport() : void {
		this.researchPassport.fileId = this.getFirstIdOrNull(this.resPassFile);
		this.researchPassport.researchMethod = this.getFirstIdOrNull(this.resPassResMethod);
		this.researchPassport.researchObject = this.getFirstIdOrNull(this.resPassResObject);
		this.creationsService.createResearchPassport(this.researchPassport);
	}

	public researchMethod = new ResearchMethod();
	createResearchMethod() : void {
		this.creationsService.createResearchMethod(this.researchMethod);
	}

	public uploadFile() : void {
		//TODO
		console.log(this.uploader.options);
		this.fileItem = this.uploader.queue[this.uploader.queue.length-1];
    	FileItem.prototype._form = this;
   		this.fileItem.onSuccess = this.onUploadSuccess;
   		this.fileItem.onError = this.onUploadError;
    	this.fileItem.onCancel = this.onUploadCancel;
    	this.fileItem.upload();
    
    this.onUploadStart();
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

	public initUploader() : void {
		let fileHeaders = [{name : 'FILE_TYPE', value : this.fileType}, {name : 'FILE_NAME', value : this.fileName}];
		this.uploader.options.headers = fileHeaders;
	}

	private getFirstIdOrNull(arr : DropdownItem[]) : number {
		return arr.length == 0 ? null : arr[0].id;
	}

	private uploadDisabled() : boolean {
		return this.uploader.isUploading || !(this.fileType != null && this.fileType != '' && this.fileName != null && this.fileName != '');
	}
}

export class QualityStandart {
	public name : string;
}

export class ResearchObjectType {
	public name : string;
}

export class Manufacturer {
	
	public name : string;
	public year : string;
	public description : string;
}

export class Organization {
	public fullTitle : string;
	public shortTitle : string;
}

export class Attachment {
	public researchObject : number;
	public name : string;
	public description : string;
	public fileId : number;
}

export class ResearchPassport {
	public researchMethod : number;
	public researchObject : number;
	public fileId : number;
	public description : string;
	public intensity : string;
}

export class ResearchMethod {
	public name : string;
	public description : string;
}