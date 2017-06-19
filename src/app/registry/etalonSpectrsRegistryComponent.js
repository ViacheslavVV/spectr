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
var etalonSpectrsService_1 = require("../service/etalonSpectrsService");
var EtalonSpectrsRegistryComponent = (function () {
    function EtalonSpectrsRegistryComponent(etalonSpectrService) {
        this.etalonSpectrService = etalonSpectrService;
        this.mode = 'Observable';
        this.filter = new Filter();
    }
    EtalonSpectrsRegistryComponent.prototype.aa = function () {
        console.log(this.filter);
        console.log(this.filter.getAsGetParams());
        this.getEtalonSpectrs();
    };
    EtalonSpectrsRegistryComponent.prototype.ngOnInit = function () { this.getEtalonSpectrs(); };
    EtalonSpectrsRegistryComponent.prototype.getEtalonSpectrs = function () {
        var _this = this;
        console.log("getEtalogSpectrs component");
        this.etalonSpectrService.getEtalonSpectrs(this.filter)
            .subscribe(function (data) { return _this.data = data; }, function (error) { return _this.errorMessage = error; });
    };
    EtalonSpectrsRegistryComponent.prototype.imgClick = function (img) {
        this.currentImgSrc = img;
    };
    EtalonSpectrsRegistryComponent = __decorate([
        core_1.Component({
            selector: '<etalon-spectrs>',
            templateUrl: '../pages/etalonSpectrRegistryComponent.html',
            providers: [etalonSpectrsService_1.EtalonSpectrsService]
        }), 
        __metadata('design:paramtypes', [etalonSpectrsService_1.EtalonSpectrsService])
    ], EtalonSpectrsRegistryComponent);
    return EtalonSpectrsRegistryComponent;
}());
exports.EtalonSpectrsRegistryComponent = EtalonSpectrsRegistryComponent;
var Filter = (function () {
    function Filter() {
        this.waveLength = null;
        this.buildMaterialName = null;
        this.materialName = null;
        this.chemicalElementName = null;
        this.spectrLinePersonName = null;
    }
    Filter.prototype.getAsGetParams = function () {
        var result = "";
        var firstSymbol = "";
        var joinSymbol = "&";
        if (this.isNotEmpty(this.waveLength)) {
            result += "waveLength=" + this.waveLength;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.buildMaterialName)) {
            result += firstSymbol + "buildMaterialName=" + this.buildMaterialName;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.materialName)) {
            result += firstSymbol + "materialName=" + this.materialName;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.chemicalElementName)) {
            result += firstSymbol + "chemicalElementName=" + this.chemicalElementName;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.spectrLinePersonName)) {
            result += firstSymbol + "spectrLinePersonName=" + this.spectrLinePersonName;
        }
        return result;
    };
    Filter.prototype.isNotEmpty = function (value) {
        return value != null && value != "";
    };
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=etalonSpectrsRegistryComponent.js.map