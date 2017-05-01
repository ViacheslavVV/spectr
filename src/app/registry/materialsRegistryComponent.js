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
var materialsService_1 = require('../service/materialsService');
var globalSettings_1 = require('../service/globalSettings');
var URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/files/upload';
var MaterialsRegistryComponent = (function () {
    function MaterialsRegistryComponent(materialsService) {
        this.materialsService = materialsService;
        this.mode = 'Observable';
        this.filter = new Filter();
    }
    MaterialsRegistryComponent.prototype.ngAfterViewInit = function () {
    };
    MaterialsRegistryComponent.prototype.ngOnInit = function () { this.getMaterials(); };
    MaterialsRegistryComponent.prototype.getMaterials = function () {
        var _this = this;
        console.log("getMateriasl component");
        this.materialsService.getMaterials(this.filter)
            .subscribe(function (data) { return _this.data = data; }, function (error) { return _this.errorMessage = error; });
    };
    MaterialsRegistryComponent = __decorate([
        core_1.Component({
            selector: '<materials>',
            templateUrl: '../pages/materialsRegistryComponent.html',
            providers: [materialsService_1.MaterialsService]
        }), 
        __metadata('design:paramtypes', [materialsService_1.MaterialsService])
    ], MaterialsRegistryComponent);
    return MaterialsRegistryComponent;
}());
exports.MaterialsRegistryComponent = MaterialsRegistryComponent;
var Filter = (function () {
    function Filter() {
        this.name = null;
        this.probeDate = null;
        this.probePlace = null;
        this.description = null;
    }
    Filter.prototype.getAsGetParams = function () {
        var result = "";
        var firstSymbol = "";
        var joinSymbol = "&";
        if (this.isNotEmpty(this.name)) {
            result += "name=" + this.name;
            firstSymbol = joinSymbol;
        }
        if (this.probeDate != null) {
            result += firstSymbol + "probeDate=" + this.probeDate.toLocaleDateString();
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.probePlace)) {
            result += firstSymbol + "probePlace=" + this.probePlace;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.description)) {
            result += firstSymbol + "description=" + this.description;
        }
        return result;
    };
    Filter.prototype.isNotEmpty = function (value) {
        return value != null && value != "";
    };
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=materialsRegistryComponent.js.map