import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ResearchObjectsService } from "../service/researchObjectsService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';
import { DropdownProviderService } from '../service/dropdownProviderService';


@Component({
  selector: '<research-object>',
  templateUrl: '../../pages/card/researchObjectCard.html',
  providers: [ ResearchObjectsService ]
})
export class ResearchObjectCardComponent {

	/**
	 * данные для выпадающего списка (organizationId) allowMultiselect = false
	 */
	organizationsData : Array<DropdownItem> = new Array<DropdownItem>();
	selectedOrganization :  Array<DropdownItem> = [];

	/**
	 * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
	 */
	researchObject : ResearchObject = new ResearchObject();

	constructor(private researchObjectsService : ResearchObjectsService, private dropdownProviderService : DropdownProviderService, private router : Router) {
		this.dropdownProviderService.getOrganizations().subscribe(data => this.organizationsData = data , error => this.organizationsData = new Array<DropdownItem>());
	}

	/**
	 * Установить все id из выпадающий списков в объект
	 */
	private setIdsToObject() : void {
		this.researchObject.organization = this.getFirstIdOrNull(this.selectedOrganization);
	}

	private getFirstIdOrNull(arr : DropdownItem[]) : number {
		return arr.length == 0 ? null : arr[0].id;
	}

	onSave() : void {
		this.setIdsToObject();
		if (this.researchObject.dateOrig != null) {
			this.researchObject.date = this.researchObject.dateOrig.toLocaleDateString();
		} else {
			this.researchObject.date = null;
		}
		this.researchObjectsService.createResearchObject(this.researchObject).subscribe(
						data => {console.log(data); this.toRegistr();},
                       error =>  console.log(error));
	}

	toRegistr() : void {
		this.router.navigate(['researchObjects']);
	}
}

export class ResearchObject {
	
	public organization : number;
	public name : string;
	public description : string;
	public dateOrig : Date;
	public date : string;
}