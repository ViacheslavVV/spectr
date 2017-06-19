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
var globalSettings_1 = require('../service/globalSettings');
var httpClient_1 = require('./httpClient');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var DropdownProviderService = (function () {
    function DropdownProviderService(httpClient) {
        this.httpClient = httpClient;
        this.materialsDropdownUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/materials/idname";
        this.buildMaterialsDropdownUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/bmaterials/idname";
        this.manufacturersDropdownUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/manufacturers/idname";
        this.researchObjectsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/resobjects/idname";
        this.qualityStandartsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/qstandarts/idname";
        this.researchPassportsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/rpass/idname";
        this.chemicalElementsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/chemelem/idname";
        this.spectrLinesUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/sline/idname";
        this.organizationsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/organization/idname";
        this.resMethodsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/resmethod/idname";
        this.resPasportFileUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/specfiles";
    }
    DropdownProviderService.prototype.getMaterials = function () {
        return this.httpClient.get(this.materialsDropdownUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getBuildMaterials = function () {
        return this.httpClient.get(this.buildMaterialsDropdownUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getManufacturers = function () {
        return this.httpClient.get(this.manufacturersDropdownUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getResearchObjecs = function () {
        return this.httpClient.get(this.researchObjectsUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getQualityStandarts = function () {
        return this.httpClient.get(this.qualityStandartsUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getResearchPassports = function () {
        return this.httpClient.get(this.researchPassportsUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getChemicalElements = function () {
        return this.httpClient.get(this.chemicalElementsUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getSpectrLines = function () {
        return this.httpClient.get(this.spectrLinesUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getOrganizations = function () {
        return this.httpClient.get(this.organizationsUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getResearchMethods = function () {
        return this.httpClient.get(this.resMethodsUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.getResearchPassportFiles = function () {
        return this.httpClient.get(this.resPasportFileUrl).map(this.extractData);
    };
    DropdownProviderService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    DropdownProviderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpClient_1.HttpClient])
    ], DropdownProviderService);
    return DropdownProviderService;
}());
exports.DropdownProviderService = DropdownProviderService;
//# sourceMappingURL=dropdownProviderService.js.map