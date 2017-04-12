import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EtalonSpectrsService } from "../service/etalonSpectrsService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';
import { DropdownProviderService } from '../service/dropdownProviderService';


@Component({
  selector: '<build-material>',
  templateUrl: '../../pages/card/etalonSpectrCard.html',
  providers: [ EtalonSpectrsService ]
})
export class EtalonSpectrCardComponent {

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

	constructor(private etalonSpectrsService : EtalonSpectrsService, private dropdownProviderService : DropdownProviderService, private router : Router) {
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

	onSave() : void {
		this.setIdsToObject();
		this.etalonSpectrsService.createEtalonSpectr(this.etalonSpectr).subscribe(
						data => {console.log(data); this.toRegistr();},
                       error =>  console.log(error));
	}

	toRegistr() : void {
		this.router.navigate(['spectrs/etalon']);
	}
}

export class EtalonSpectr {
	
	public material : number;
	public buildMaterial : number;
	public chemicalElement : number;
	public spectrLine : number;
	public waveLength : string;
	public lineDescription : string;
	public spectrBase : string;
}