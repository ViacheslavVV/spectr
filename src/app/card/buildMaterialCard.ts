import { Component } from '@angular/core';
import { BuildMaterialsService } from "../service/buildMaterialsService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';

@Component({
  selector: '<build-material>',
  templateUrl: '../../pages/buildMaterialCard.html',
  providers: [ BuildMaterialsService ]
})
export class BuildMaterialCardComponent {

	/**
	 * данные для выпадающего списка (qualityStandarts)
	 */
	qualityStandartsData : Array<DropdownItem> = [ {id: 1, text: 'Standart1'}, {id: 2, text:'Standart2'}, {id: 3, text: 'Standart3'}, {id: 4, text:'Standart4'}, 
	{id: 5, text: 'Standart5'}, {id: 6, text:'Standart6'}, {id: 7, text: 'Standart7'}, {id: 8, text:'Standart8'}, {id: 9, text: 'Standart9'}, {id: 10, text:'Standart10'} ];
	selectedStandarts :  Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (researchObjectTypeId)
	 */
	researchObjectTypeData : Array<DropdownItem> = [ {id: 1, text: 'ResObject1'}, {id: 2, text:'ResObject2'}, {id: 3, text: 'ResObject3'}, {id: 4, text:'ResObject4'}, 
	{id: 5, text: 'ResObject5'}, {id: 6, text:'ResObject6'}, {id: 7, text: 'ResObject7'}, {id: 8, text:'ResObject8'}, {id: 9, text: 'ResObject9'}, {id: 10, text:'ResObject10'} ];
	selectedResearchObject: Array<DropdownItem> = [];
	/**
	 * данные для выпадающего списка (materials)
	 */
	materialsData : Array<DropdownItem> = [ {id: 1, text: 'material1'}, {id: 2, text:'material2'} ];
	selectedMaterials : Array<DropdownItem> = [];

	/**
	 * данные для выпадающего списка (manufacturerId)
	 */
	manufacturerData : Array<DropdownItem> = [ {id: 1, text: 'manufacturer1'}, {id: 2, text:'manufacturer2'} ];
	selectedManufacturer : Array<DropdownItem> = [];

	/**
	 * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
	 */
	private buildMaterial : BuildMaterial = new BuildMaterial();

	constructor(private buildMaterialsService : BuildMaterialsService) {
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
		this.buildMaterialsService.createBuildMaterial(this.buildMaterial);
	}
}

export class BuildMaterial {
	public qualityStandarts : Array<number>;
	public researchObjectTypeId : number;
	public materials : Array<number>;
	public manufacturerId : number;
	public mark : string;
	public shortName : string;
	public frostResistance : string;
	public mechanicalStress : string;
	public madeYear : string;
	public spectrFile : string;
}