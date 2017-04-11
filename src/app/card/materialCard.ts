import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MaterialsService } from "../service/materialsService";


@Component({
  selector: '<build-material>',
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
		this.materialsService.createMaterial(this.material).subscribe(
						data => {console.log(data); this.toRegistr();},
                       error =>  console.log(error));

	}

	toRegistr() : void {
		this.router.navigate(['materials']);
	}
}

export class Material {
	
	public name : number;
	public probeDate : Date;
	public probePlace : string;
	public description : string;
	public spectrFile : string;
}