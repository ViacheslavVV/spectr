import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SpectrsService } from "../service/spectrsRegistryService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';
import { DropdownProviderService } from '../service/dropdownProviderService';


@Component({
  selector: '<spectr>',
  templateUrl: '../../pages/card/spectrCard.html',
  providers: [ SpectrsService ]
})
export class SpectrCardComponent {

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

	constructor(private spectrsService : SpectrsService, private dropdownProviderService : DropdownProviderService, private router : Router) {
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

	private getFirstIdOrNull(arr : DropdownItem[]) : number {
		return arr.length == 0 ? null : arr[0].id;
	}

	onSave() : void {
		this.setIdsToObject();
		this.spectrsService.createSpectr(this.spectr).subscribe(
						data => {console.log(data); this.toRegistr();},
                       error =>  console.log(error));
	}

	toRegistr() : void {
		this.router.navigate(['spectrs']);
	}
}

export class Spectr {
	
	public researchPassport : number;
	public spectrLine : number;
	public chemicalElement : number;
	public waveLength : string;
	public lineDescription : string;
	public spectrBase : string;
}