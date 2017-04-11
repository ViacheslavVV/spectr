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
var spectrsRegistryService_1 = require("../service/spectrsRegistryService");
var dropdownProviderService_1 = require('../service/dropdownProviderService');
var SpectrCardComponent = (function () {
    function SpectrCardComponent(spectrsService, dropdownProviderService, router) {
        var _this = this;
        this.spectrsService = spectrsService;
        this.dropdownProviderService = dropdownProviderService;
        this.router = router;
        /**
         * данные для выпадающего списка (researchPassportId) allowMultiselect = false
         */
        this.researchPassportsData = new Array();
        this.selectedResearchPassport = [];
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
        this.spectr = new Spectr();
        this.dropdownProviderService.getResearchPassports().subscribe(function (data) { return _this.researchPassportsData = data; }, function (error) { return _this.researchPassportsData = new Array(); });
        this.dropdownProviderService.getSpectrLines().subscribe(function (data) { return _this.spectrLinesData = data; }, function (error) { return _this.spectrLinesData = new Array(); });
        this.dropdownProviderService.getChemicalElements().subscribe(function (data) { return _this.chemicalElementsData = data; }, function (error) { return _this.chemicalElementsData = new Array(); });
    }
    /**
     * Установить все id из выпадающий списков в объект
     */
    SpectrCardComponent.prototype.setIdsToObject = function () {
        this.spectr.spectrLine = this.getFirstIdOrNull(this.selectedSpectrLine);
        this.spectr.researchPassport = this.getFirstIdOrNull(this.selectedResearchPassport);
        this.spectr.chemicalElement = this.getFirstIdOrNull(this.selectedChemicalElement);
    };
    SpectrCardComponent.prototype.getFirstIdOrNull = function (arr) {
        return arr.length == 0 ? null : arr[0].id;
    };
    SpectrCardComponent.prototype.onSave = function () {
        var _this = this;
        this.setIdsToObject();
        this.spectrsService.createSpectr(this.spectr).subscribe(function (data) { console.log(data); _this.toRegistr(); }, function (error) { return console.log(error); });
    };
    SpectrCardComponent.prototype.toRegistr = function () {
        this.router.navigate(['spectrs']);
    };
    SpectrCardComponent = __decorate([
        core_1.Component({
            selector: '<build-material>',
            templateUrl: '../../pages/card/spectrCard.html',
            providers: [spectrsRegistryService_1.SpectrsService]
        }), 
        __metadata('design:paramtypes', [spectrsRegistryService_1.SpectrsService, dropdownProviderService_1.DropdownProviderService, router_1.Router])
    ], SpectrCardComponent);
    return SpectrCardComponent;
}());
exports.SpectrCardComponent = SpectrCardComponent;
var Spectr = (function () {
    function Spectr() {
    }
    return Spectr;
}());
exports.Spectr = Spectr;
//# sourceMappingURL=spectrCard.js.map