import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EtalonSpectrsService } from "../service/etalonSpectrsService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';
import { DropdownProviderService } from '../service/dropdownProviderService';

import { GlobalSettings } from '../service/globalSettings';
import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { FileItem, FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: '<etalon-spectr>',
  templateUrl: '../../pages/card/etalonSpectrCard.html',
  providers: [ EtalonSpectrsService, ToastyService ]
})
export class EtalonSpectrCardComponent {

	private fileUploadUrl = GlobalSettings.SERVER_ADDRESS + '/files/uploadImg';

	public uploader : FileUploader = new FileUploader({url : this.fileUploadUrl});

	fileItem : FileItem;

	/**
	 * ид файла спектра
	 */
	private spectrBaseId : number = null;

	/**
	 * данные для выпадающего списка (materialId) allowMultiselect = false
	 */
	materialsData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedMaterial :  Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (buildMaterialId) allowMultiselect = false
	 */
	buildMaterialsData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedBuildMaterial :  Array<DropdownItem> = [];

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
	private etalonSpectr : EtalonSpectr = new EtalonSpectr();

	constructor(private toastyService : ToastyService, private etalonSpectrsService : EtalonSpectrsService, private dropdownProviderService : DropdownProviderService, private router : Router) {
		this.dropdownProviderService.getMaterials().subscribe(data => this.materialsData = data , error => this.materialsData = new Array<DropdownItem>());
		this.dropdownProviderService.getBuildMaterials().subscribe(data => this.buildMaterialsData = data , error => this.buildMaterialsData = new Array<DropdownItem>());
		this.dropdownProviderService.getSpectrLines().subscribe(data => this.spectrLinesData =  data, error => this.spectrLinesData = new Array<DropdownItem>());
		this.dropdownProviderService.getChemicalElements().subscribe(data => this.chemicalElementsData =  data , error => this.chemicalElementsData = new Array<DropdownItem>());
	}

	/**
	 * Установить все id из выпадающий списков в объект
	 */
	private setIdsToObject() : void {
		this.etalonSpectr.material = this.getFirstIdOrNull(this.selectedMaterial);
		this.etalonSpectr.buildMaterial = this.getFirstIdOrNull(this.selectedBuildMaterial);
		this.etalonSpectr.spectrLine = this.getFirstIdOrNull(this.selectedSpectrLine);
		this.etalonSpectr.chemicalElement = this.getFirstIdOrNull(this.selectedChemicalElement);
	}

	private getFirstIdOrNull(arr : DropdownItem[]) : number {
		return arr.length == 0 ? null : arr[0].id;
	}

	private setFileId() : void {
		this.etalonSpectr.spectrBase = this.spectrBaseId;
	}

	afterUpload() : void {
		this.setIdsToObject();
		this.setFileId();
		console.log(this.etalonSpectr);
		this.etalonSpectrsService.createEtalonSpectr(this.etalonSpectr).subscribe(
						data => {console.log(data); this.toRegistr();},
                       error =>  console.log(error));
	}

	toRegistr() : void {
		this.router.navigate(['spectrs/etalon']);
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

export class EtalonSpectr {
	
	public material : number;
	public buildMaterial : number;
	public chemicalElement : number;
	public spectrLine : number;
	public waveLength : string;
	public lineDescription : string;
	public spectrBase : number;
}