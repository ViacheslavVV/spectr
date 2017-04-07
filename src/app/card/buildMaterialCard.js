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
var router_1 = require('@angular/router');
var buildMaterialsService_1 = require("../service/buildMaterialsService");
var dropdownProviderService_1 = require('../service/dropdownProviderService');
var BuildMaterialCardComponent = (function () {
    function BuildMaterialCardComponent(buildMaterialsService, dropdownProviderService, router) {
        var _this = this;
        this.buildMaterialsService = buildMaterialsService;
        this.dropdownProviderService = dropdownProviderService;
        this.router = router;
        /**
         * данные для выпадающего списка (qualityStandarts)
         */
        this.qualityStandartsData = new Array();
        this.selectedStandarts = [];
        /**
         * данные для выпадающего списка (researchObjectTypeId)
         */
        this.researchObjectTypeData = new Array();
        this.selectedResearchObject = [];
        /**
         * данные для выпадающего списка (materials)
         */
        this.materialsData = new Array();
        this.selectedMaterials = [];
        /**
         * данные для выпадающего списка (manufacturerId)
         */
        this.manufacturerData = new Array();
        this.selectedManufacturer = [];
        /**
         * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
         */
        this.buildMaterial = new BuildMaterial();
        this.dropdownProviderService.getQualityStandarts().subscribe(function (data) { return _this.qualityStandartsData = data; }, function (error) { return _this.qualityStandartsData = new Array(); });
        this.dropdownProviderService.getMaterials().subscribe(function (data) { return _this.materialsData = data; }, function (error) { return _this.materialsData = new Array(); });
        this.dropdownProviderService.getManufacturers().subscribe(function (data) { return _this.manufacturerData = data; }, function (error) { return _this.manufacturerData = new Array(); });
        this.dropdownProviderService.getResearchObjecTypes().subscribe(function (data) { return _this.researchObjectTypeData = data; }, function (error) { return _this.researchObjectTypeData = new Array(); });
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
        var _this = this;
        this.setIdsToObject();
        this.buildMaterialsService.createBuildMaterial(this.buildMaterial).subscribe(function (data) { console.log(data); _this.toRegistr(); }, function (error) { return console.log(error); });
    };
    BuildMaterialCardComponent.prototype.toRegistr = function () {
        this.router.navigate(['materials/build']);
    };
    BuildMaterialCardComponent = __decorate([
        core_1.Component({
            selector: '<build-material>',
            templateUrl: '../../pages/buildMaterialCard.html',
            providers: [buildMaterialsService_1.BuildMaterialsService]
        }), 
        __metadata('design:paramtypes', [buildMaterialsService_1.BuildMaterialsService, dropdownProviderService_1.DropdownProviderService, router_1.Router])
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