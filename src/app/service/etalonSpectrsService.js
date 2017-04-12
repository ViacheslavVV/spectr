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
var EtalonSpectrsService = (function () {
    function EtalonSpectrsService(http) {
        this.http = http;
        this.createEtalonSpectrUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/etspectrs/add";
        this.etalonSpectrsUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/etspectrs/all"; // url to get all etalon spectrs
        this.etalonSpectrsUrlWithParams = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/etspectrs/filters";
    }
    EtalonSpectrsService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    EtalonSpectrsService.prototype.getEtalonSpectrs = function (filter) {
        console.log("getEtalonSpectrs service");
        return this.http.get(this.getUrlForFetchWithParams(filter)).map(this.extractData);
    };
    EtalonSpectrsService.prototype.getUrlForFetchWithParams = function (filter) {
        var params = filter.getAsGetParams();
        return params == "" ? this.etalonSpectrsUrl : this.etalonSpectrsUrlWithParams + "?" + params;
    };
    EtalonSpectrsService.prototype.createEtalonSpectr = function (spectr) {
        return this.http.post(this.createEtalonSpectrUrl, spectr);
    };
    EtalonSpectrsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpClient_1.HttpClient])
    ], EtalonSpectrsService);
    return EtalonSpectrsService;
}());
exports.EtalonSpectrsService = EtalonSpectrsService;
//# sourceMappingURL=etalonSpectrsService.js.map