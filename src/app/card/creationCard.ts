import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CreationsService } from "../service/creationService";
import { MutliSelectDropdownComponent, DropdownItem } from '../component/multiselectComponent';
import { DropdownProviderService } from '../service/dropdownProviderService';


@Component({
  selector: '<creation-card>',
  templateUrl: '../../pages/card/creationCard.html',
  providers: [ CreationsService ]
})
export class CreationComponent {

    public attachmentResearchObjectId : number;
	public attachmentFileId : number;
	public resPassResMethodId : number;
	public resPassResObjectId : number;
	public resPassFileId : number;

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

	constructor(private creationsService : CreationsService, private dropdownProviderService : DropdownProviderService, private router : Router) {
		this.refreshDropdowns();
	}

	/**
	 * Обновить данные выпадающих списков
	 */
	private refreshDropdowns() : void {
		//TODO для 5 выпадающих списков
		/*
		this.dropdownProviderService.getQualityStandarts().subscribe(data => this.qualityStandartsData = data , error => this.qualityStandartsData = new Array<DropdownItem>());
		this.dropdownProviderService.getMaterials().subscribe(data => this.materialsData =  data, error => this.materialsData = new Array<DropdownItem>());
		this.dropdownProviderService.getManufacturers().subscribe(data => this.manufacturerData =  data , error => this.manufacturerData = new Array<DropdownItem>());
		*/
		this.dropdownProviderService.getResearchObjecs().subscribe(data => this.resPassResObjectsData =  data , error => this.resPassResObjectsData = new Array<DropdownItem>());
		this.dropdownProviderService.getResearchObjecs().subscribe(data => this.attachmentResearchObject =  data , error => this.attachmentResearchObject = new Array<DropdownItem>());
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
		this.creationsService.createAttachment(this.attachment);
	}

	public researchPassport = new ResearchPassport();
	createResearchPassport() : void {
		this.creationsService.createResearchPassport(this.researchPassport);
	}

	public researchMethod = new ResearchMethod();
	createResearchMethod() : void {
		this.creationsService.createResearchMethod(this.researchMethod);
	}

	toRegistr() : void {
		this.router.navigate(['materials/build']);
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