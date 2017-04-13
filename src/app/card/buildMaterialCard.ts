import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BuildMaterialsService } from "../service/buildMaterialsService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';
import { DropdownProviderService } from '../service/dropdownProviderService';


@Component({
  selector: '<build-material>',
  templateUrl: '../../pages/card/buildMaterialCard.html',
  providers: [ BuildMaterialsService ]
})
export class BuildMaterialCardComponent {

	/**
	 * данные для выпадающего списка (qualityStandarts)
	 */
	qualityStandartsData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedStandarts :  Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (researchObjectTypeId)
	 */
	researchObjectTypeData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedResearchObject: Array<DropdownItem> = [];
	/**
	 * данные для выпадающего списка (materials)
	 */
	materialsData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedMaterials : Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (manufacturerId)
	 */
	manufacturerData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedManufacturer : Array<DropdownItem> = [];

	/**
	 * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
	 */
	private buildMaterial : BuildMaterial = new BuildMaterial();

	constructor(private buildMaterialsService : BuildMaterialsService, private dropdownProviderService : DropdownProviderService, private router : Router) {
		this.dropdownProviderService.getQualityStandarts().subscribe(data => this.qualityStandartsData = data , error => this.qualityStandartsData = new Array<DropdownItem>());
		this.dropdownProviderService.getMaterials().subscribe(data => this.materialsData =  data, error => this.materialsData = new Array<DropdownItem>());
		this.dropdownProviderService.getManufacturers().subscribe(data => this.manufacturerData =  data , error => this.manufacturerData = new Array<DropdownItem>());
		this.dropdownProviderService.getResearchObjecs().subscribe(data => this.researchObjectTypeData =  data , error => this.researchObjectTypeData = new Array<DropdownItem>());
	}

	/**
	 * Установить все id из выпадающий списков в объект
	 */
	private setIdsToObject() : void {
		this.buildMaterial.materials = this.selectedMaterials.map(item => item.id);
		this.buildMaterial.qualityStandarts = this.selectedStandarts.map(item => item.id);
		this.buildMaterial.manufacturerId = this.selectedManufacturer.length == 0 ? null : this.selectedManufacturer[0].id;
		this.buildMaterial.researchObjectTypeId = this.selectedResearchObject.length == 0 ? null : this.selectedResearchObject[0].id;
	}

	onSave() : void {
		this.setIdsToObject();
		this.buildMaterialsService.createBuildMaterial(this.buildMaterial).subscribe(
						data => {console.log(data); this.toRegistr();},
                       error =>  console.log(error));

	}

	toRegistr() : void {
		this.router.navigate(['materials/build']);
	}
}

export class BuildMaterial {
	
	public manufacturerId : number;
	public mark : string;
	public shortName : string;
	public frostResistance : string;
	public mechanicalStress : string;
	public madeYear : string;
	public spectrFile : string;
	public qualityStandarts : Array<number>;
	public researchObjectTypeId : number;
	public materials : Array<number>;
}