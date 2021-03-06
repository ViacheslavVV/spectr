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
var BuildMaterialsService = (function () {
    function BuildMaterialsService(httpClient) {
        this.httpClient = httpClient;
        this.buildMaterialsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/bmaterials/all"; // url to get all build materials
        this.buildMaterialsUrlWithParams = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/bmaterials/filters";
        this.createBuildMaterialUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/bmaterials/add";
    }
    BuildMaterialsService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    BuildMaterialsService.prototype.getBuildMaterials = function (filter) {
        console.log("getBuildMaterials service");
        return this.httpClient.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
    };
    BuildMaterialsService.prototype.getUrlForFetchWithParams = function (filter) {
        var params = filter.getAsGetParams();
        return params == "" ? this.buildMaterialsUrl : this.buildMaterialsUrlWithParams + "?" + params;
    };
    BuildMaterialsService.prototype.createBuildMaterial = function (buildMaterial) {
        console.log('buildMaterial create');
        return this.httpClient.post(this.createBuildMaterialUrl, buildMaterial);
    };
    BuildMaterialsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpClient_1.HttpClient])
    ], BuildMaterialsService);
    return BuildMaterialsService;
}());
exports.BuildMaterialsService = BuildMaterialsService;
//# sourceMappingURL=buildMaterialsService.js.map