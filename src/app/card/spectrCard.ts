import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SpectrsService } from "../service/spectrsRegistryService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';
import { DropdownProviderService } from '../service/dropdownProviderService';
import { GlobalSettings } from '../service/globalSettings';

import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { FileItem, FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: '<spectr>',
  templateUrl: '../../pages/card/spectrCard.html',
  providers: [ SpectrsService, ToastyService ]
})
export class SpectrCardComponent {

	private fileUploadUrl = GlobalSettings.SERVER_ADDRESS + '/files/uploadImg';

	public uploader : FileUploader = new FileUploader({url : this.fileUploadUrl});

  	fileItem : FileItem;

	/**
	 * ид файла спектра
	 */
	private spectrBaseId : number = null;

	/**
	 * данные для выпадающего списка (researchPassportId) allowMultiselect = false
	 */
	researchPassportsData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedResearchPassport :  Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (spectrLineId) allowMultiselect = false
	 */
	spectrLinesData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedSpectrLine: Array<DropdownItem> = [];
	/**
	 * данные для выпадающего списка (chemicalElementId) allowMultiselect = false
	 */
	chemicalElementsData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedChemicalElement : Array<DropdownItem> = [];

	/**
	 * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
	 */
	private spectr : Spectr = new Spectr();

	constructor( private toastyService : ToastyService, private spectrsService : SpectrsService, private dropdownProviderService : DropdownProviderService, private router : Router) {
		this.dropdownProviderService.getResearchPassports().subscribe(data => this.researchPassportsData = data , error => this.researchPassportsData = new Array<DropdownItem>());
		this.dropdownProviderService.getSpectrLines().subscribe(data => this.spectrLinesData =  data, error => this.spectrLinesData = new Array<DropdownItem>());
		this.dropdownProviderService.getChemicalElements().subscribe(data => this.chemicalElementsData =  data , error => this.chemicalElementsData = new Array<DropdownItem>());
	}

	/**
	 * Установить все id из выпадающий списков в объект
	 */
	private setIdsToObject() : void {
		this.spectr.spectrLine = this.getFirstIdOrNull(this.selectedSpectrLine);
		this.spectr.researchPassport = this.getFirstIdOrNull(this.selectedResearchPassport);
		this.spectr.chemicalElement = this.getFirstIdOrNull(this.selectedChemicalElement);
	}

	private setFileId() : void {
		this.spectr.spectrBase = this.spectrBaseId;
	}

	private getFirstIdOrNull(arr : DropdownItem[]) : number {
		return arr.length == 0 ? null : arr[0].id;
	}

	afterUpload() : void {
		this.setIdsToObject();
		this.setFileId();
		this.spectrsService.createSpectr(this.spectr).subscribe(
						data => {console.log(data); this.toRegistr();},
                       error =>  console.log(error));
	}

	toRegistr() : void {
		this.router.navigate(['spectrs']);
	}


	public onSave() : void {
		//TODO
		this.fileItem = this.uploader.queue[this.uploader.queue.length-1];
   		this.fileItem.onSuccess = (response: string, status : number, headers : any) => {
   			this.spectrBaseId = JSON.parse(response).id;
		    var toastOptions:ToastOptions = {
		            title: "Загрузка файла:",
		            msg: "Файл успешно загружен!",
		            showClose: true,
		            timeout: 5000,
		            theme: 'default'
		        };
		        
		       this.toastyService.success(toastOptions);
		       this.afterUpload();
   		};
   		this.fileItem.onError = () => {
   			 var toastOptions:ToastOptions = {
            title: "Загрузка файла:",
            msg: "Ошибка загрузки файла!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
	        };
	        
	       this.toastyService.error(toastOptions);
   		};
    	this.fileItem.onCancel = () => {
    		var toastOptions:ToastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла отменена!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        	};
        
       		this.toastyService.error(toastOptions);
    	};
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

 
}

export class Spectr {
	
	public researchPassport : number;
	public spectrLine : number;
	public chemicalElement : number;
	public waveLength : string;
	public lineDescription : string;
	public spectrBase : number;
}