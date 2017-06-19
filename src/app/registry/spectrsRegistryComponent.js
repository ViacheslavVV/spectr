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
var spectrsRegistryService_1 = require("../service/spectrsRegistryService");
var SpectrsRegistryComponent = (function () {
    function SpectrsRegistryComponent(spectrService) {
        this.spectrService = spectrService;
        this.mode = 'Observable';
        this.filter = new Filter();
    }
    SpectrsRegistryComponent.prototype.aa = function () {
        console.log(this.filter);
        console.log(this.filter.getAsGetParams());
        this.getSpectrs();
    };
    SpectrsRegistryComponent.prototype.ngOnInit = function () { this.getSpectrs(); };
    SpectrsRegistryComponent.prototype.getSpectrs = function () {
        var _this = this;
        console.log("getSpectrs component");
        this.spectrService.getSpectrs(this.filter)
            .subscribe(function (data) { _this.data = data; console.log(data); }, function (error) { return _this.errorMessage = error; });
    };
    SpectrsRegistryComponent.prototype.imgClick = function (img) {
        this.currentImgSrc = img;
    };
    SpectrsRegistryComponent = __decorate([
        core_1.Component({
            selector: '<spectrs>',
            templateUrl: '../pages/spectrsRegistryComponent.html',
            providers: [spectrsRegistryService_1.SpectrsService]
        }), 
        __metadata('design:paramtypes', [spectrsRegistryService_1.SpectrsService])
    ], SpectrsRegistryComponent);
    return SpectrsRegistryComponent;
}());
exports.SpectrsRegistryComponent = SpectrsRegistryComponent;
var Filter = (function () {
    function Filter() {
        this.waveLength = null;
        this.intensity = null;
        this.chemicalElementName = null;
        this.spectrLineName = null;
    }
    Filter.prototype.getAsGetParams = function () {
        var result = "";
        var firstSymbol = "";
        var joinSymbol = "&";
        if (this.isNotEmpty(this.waveLength)) {
            result += "waveLength=" + this.waveLength;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.intensity)) {
            result += firstSymbol + "intensity=" + this.intensity;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.chemicalElementName)) {
            result += firstSymbol + "chemicalElementName=" + this.chemicalElementName;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.spectrLineName)) {
            result += firstSymbol + "spectrLineName=" + this.spectrLineName;
        }
        return result;
    };
    Filter.prototype.isNotEmpty = function (value) {
        return value != null && value != "";
    };
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=spectrsRegistryComponent.js.map