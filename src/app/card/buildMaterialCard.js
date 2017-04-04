"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var buildMaterialsService_1 = require("../service/buildMaterialsService");
var BuildMaterialCardComponent = (function () {
    function BuildMaterialCardComponent(buildMaterialsService) {
        this.buildMaterialsService = buildMaterialsService;
        /**
         * данные для выпадающего списка (qualityStandarts)
         */
        this.qualityStandartsData = [{ id: 1, text: 'Standart1' }, { id: 2, text: 'Standart2' }, { id: 3, text: 'Standart3' }, { id: 4, text: 'Standart4' },
            { id: 5, text: 'Standart5' }, { id: 6, text: 'Standart6' }, { id: 7, text: 'Standart7' }, { id: 8, text: 'Standart8' }, { id: 9, text: 'Standart9' }, { id: 10, text: 'Standart10' }];
        this.selectedStandarts = [];
        /**
         * данные для выпадающего списка (researchObjectTypeId)
         */
        this.researchObjectTypeData = [{ id: 1, text: 'ResObject1' }, { id: 2, text: 'ResObject2' }, { id: 3, text: 'ResObject3' }, { id: 4, text: 'ResObject4' },
            { id: 5, text: 'ResObject5' }, { id: 6, text: 'ResObject6' }, { id: 7, text: 'ResObject7' }, { id: 8, text: 'ResObject8' }, { id: 9, text: 'ResObject9' }, { id: 10, text: 'ResObject10' }];
        this.selectedResearchObject = [];
        /**
         * данные для выпадающего списка (materials)
         */
        this.materialsData = [{ id: 1, text: 'material1' }, { id: 2, text: 'material2' }];
        this.selectedMaterials = [];
        /**
         * данные для выпадающего списка (manufacturerId)
         */
        this.manufacturerData = [{ id: 1, text: 'manufacturer1' }, { id: 2, text: 'manufacturer2' }];
        this.selectedManufacturer = [];
        /**
         * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
         */
        this.buildMaterial = new BuildMaterial();
    }
    /**
     * Установить все id из выпадающий списков в объект
     */
    BuildMaterialCardComponent.prototype.setIdsToObject = function () {
        this.buildMaterial.materials = this.selectedMaterials.map(function (item) { return item.id; });
        this.buildMaterial.qualityStandarts = this.selectedStandarts.map(function (item) { return item.id; });
        this.buildMaterial.manufacturerId = this.selectedManufacturer.length == 0 ? null : this.selectedManufacturer[0].id;
        this.buildMaterial.researchObjectTypeId = this.selectedResearchObject.length == 0 ? null : this.selectedResearchObject[0].id;
    };
    BuildMaterialCardComponent.prototype.onSave = function () {
        this.setIdsToObject();
        this.buildMaterialsService.createBuildMaterial(this.buildMaterial);
    };
    BuildMaterialCardComponent = __decorate([
        core_1.Component({
            selector: '<build-material>',
            templateUrl: '../../pages/buildMaterialCard.html',
            providers: [buildMaterialsService_1.BuildMaterialsService]
        }), 
        __metadata('design:paramtypes', [buildMaterialsService_1.BuildMaterialsService])
    ], BuildMaterialCardComponent);
    return BuildMaterialCardComponent;
}());
exports.BuildMaterialCardComponent = BuildMaterialCardComponent;
var BuildMaterial = (function () {
    function BuildMaterial() {
    }
    return BuildMaterial;
}());
exports.BuildMaterial = BuildMaterial;
//# sourceMappingURL=buildMaterialCard.js.map