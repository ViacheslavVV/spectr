import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MaterialsService } from "../service/materialsService";


@Component({
  selector: '<material>',
  templateUrl: '../../pages/card/materialCard.html',
  providers: [ MaterialsService ]
})
export class MaterialCardComponent {

	/**
	 * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
	 */
	private material : Material = new Material();

	constructor(private materialsService : MaterialsService, private router : Router) {}

	onSave() : void {
		if (this.material.probeDateOrig != null) {
			this.material.probeDate = this.material.probeDateOrig.toLocaleDateString();
		} else {
			this.material.probeDate = null;
		}
		this.materialsService.createMaterial(this.material).subscribe(
						data => {console.log(data); this.toRegistr();},
                       error =>  console.log(error));

	}

	toRegistr() : void {
		this.router.navigate(['materials']);
	}
}

export class Material {
	
	public name : string;
	public probeDateOrig : Date;
	public probeDate : string;
	public probePlace : string;
	public description : string;
	public spectrFile : string;
}