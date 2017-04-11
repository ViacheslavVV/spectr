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
var SpectrsService = (function () {
    function SpectrsService(http) {
        this.http = http;
        this.createSpectrUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/spectrs/add";
        this.spectrsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/spectra/all"; // url to get all spectrs
        this.spectrsUrlWithParams = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/spectra/filters"; // url to get all with filters
    }
    SpectrsService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    SpectrsService.prototype.getSpectrs = function (filter) {
        console.log("getSpectrs service");
        return this.http.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
    };
    SpectrsService.prototype.getUrlForFetchWithParams = function (filter) {
        var params = filter.getAsGetParams();
        return params == "" ? this.spectrsUrl : this.spectrsUrlWithParams + "?" + params;
    };
    SpectrsService.prototype.createSpectr = function (spectr) {
        return this.http.post(this.createSpectrUrl, spectr);
    };
    SpectrsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpClient_1.HttpClient])
    ], SpectrsService);
    return SpectrsService;
}());
exports.SpectrsService = SpectrsService;
//# sourceMappingURL=spectrsRegistryService.js.map