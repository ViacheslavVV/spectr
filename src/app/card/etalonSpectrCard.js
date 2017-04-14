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
var etalonSpectrsService_1 = require("../service/etalonSpectrsService");
var dropdownProviderService_1 = require('../service/dropdownProviderService');
var EtalonSpectrCardComponent = (function () {
    function EtalonSpectrCardComponent(etalonSpectrsService, dropdownProviderService, router) {
        var _this = this;
        this.etalonSpectrsService = etalonSpectrsService;
        this.dropdownProviderService = dropdownProviderService;
        this.router = router;
        /**
         * данные для выпадающего списка (materialId) allowMultiselect = false
         */
        this.materialsData = new Array();
        this.selectedMaterial = [];
        /**
         * данные для выпадающего списка (buildMaterialId) allowMultiselect = false
         */
        this.buildMaterialsData = new Array();
        this.selectedBuildMaterial = [];
        /**
         * данные для выпадающего списка (spectrLineId) allowMultiselect = false
         */
        this.spectrLinesData = new Array();
        this.selectedSpectrLine = [];
        /**
         * данные для выпадающего списка (chemicalElementId) allowMultiselect = false
         */
        this.chemicalElementsData = new Array();
        this.selectedChemicalElement = [];
        /**
         * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
         */
        this.etalonSpectr = new EtalonSpectr();
        this.dropdownProviderService.getMaterials().subscribe(function (data) { return _this.materialsData = data; }, function (error) { return _this.materialsData = new Array(); });
        this.dropdownProviderService.getBuildMaterials().subscribe(function (data) { return _this.buildMaterialsData = data; }, function (error) { return _this.buildMaterialsData = new Array(); });
        this.dropdownProviderService.getSpectrLines().subscribe(function (data) { return _this.spectrLinesData = data; }, function (error) { return _this.spectrLinesData = new Array(); });
        this.dropdownProviderService.getChemicalElements().subscribe(function (data) { return _this.chemicalElementsData = data; }, function (error) { return _this.chemicalElementsData = new Array(); });
    }
    /**
     * Установить все id из выпадающий списков в объект
     */
    EtalonSpectrCardComponent.prototype.setIdsToObject = function () {
        this.etalonSpectr.material = this.getFirstIdOrNull(this.selectedMaterial);
        this.etalonSpectr.buildMaterial = this.getFirstIdOrNull(this.selectedBuildMaterial);
        this.etalonSpectr.spectrLine = this.getFirstIdOrNull(this.selectedSpectrLine);
        this.etalonSpectr.chemicalElement = this.getFirstIdOrNull(this.selectedChemicalElement);
    };
    EtalonSpectrCardComponent.prototype.getFirstIdOrNull = function (arr) {
        return arr.length == 0 ? null : arr[0].id;
    };
    EtalonSpectrCardComponent.prototype.onSave = function () {
        var _this = this;
        this.setIdsToObject();
        this.etalonSpectrsService.createEtalonSpectr(this.etalonSpectr).subscribe(function (data) { console.log(data); _this.toRegistr(); }, function (error) { return console.log(error); });
    };
    EtalonSpectrCardComponent.prototype.toRegistr = function () {
        this.router.navigate(['spectrs/etalon']);
    };
    EtalonSpectrCardComponent = __decorate([
        core_1.Component({
            selector: '<etalon-spectr>',
            templateUrl: '../../pages/card/etalonSpectrCard.html',
            providers: [etalonSpectrsService_1.EtalonSpectrsService]
        }), 
        __metadata('design:paramtypes', [etalonSpectrsService_1.EtalonSpectrsService, dropdownProviderService_1.DropdownProviderService, router_1.Router])
    ], EtalonSpectrCardComponent);
    return EtalonSpectrCardComponent;
}());
exports.EtalonSpectrCardComponent = EtalonSpectrCardComponent;
var EtalonSpectr = (function () {
    function EtalonSpectr() {
    }
    return EtalonSpectr;
}());
exports.EtalonSpectr = EtalonSpectr;
//# sourceMappingURL=etalonSpectrCard.js.map