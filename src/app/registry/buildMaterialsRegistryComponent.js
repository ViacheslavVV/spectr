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
var buildMaterialsService_1 = require("../service/buildMaterialsService");
var BuildMaterialsRegistryComponent = (function () {
    function BuildMaterialsRegistryComponent(buildMaterialsService) {
        this.buildMaterialsService = buildMaterialsService;
        this.mode = 'Observable';
        this.filter = new Filter();
    }
    BuildMaterialsRegistryComponent.prototype.aa = function () {
        console.log(this.filter);
        console.log(this.filter.getAsGetParams());
        this.getBuildMaterials();
    };
    BuildMaterialsRegistryComponent.prototype.ngOnInit = function () { this.getBuildMaterials(); };
    BuildMaterialsRegistryComponent.prototype.getBuildMaterials = function () {
        var _this = this;
        console.log("getBuildMaterials component");
        this.buildMaterialsService.getBuildMaterials(this.filter)
            .subscribe(function (data) { return _this.data = data; }, function (error) { return _this.errorMessage = error; });
    };
    BuildMaterialsRegistryComponent = __decorate([
        core_1.Component({
            selector: '<build-materials>',
            templateUrl: '../pages/buildMaterialsRegistryComponent.html',
            providers: [buildMaterialsService_1.BuildMaterialsService]
        }), 
        __metadata('design:paramtypes', [buildMaterialsService_1.BuildMaterialsService])
    ], BuildMaterialsRegistryComponent);
    return BuildMaterialsRegistryComponent;
}());
exports.BuildMaterialsRegistryComponent = BuildMaterialsRegistryComponent;
var Filter = (function () {
    function Filter() {
        this.creationDate = null;
        this.name = null;
        this.manufacturerName = null;
        this.researchObjectTypeName = null;
    }
    Filter.prototype.getAsGetParams = function () {
        var result = "";
        var firstSymbol = "";
        var joinSymbol = "&";
        if (this.creationDate != null) {
            result += "creationDate=" + this.creationDate.toLocaleDateString();
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.name)) {
            result += firstSymbol + "name=" + this.name;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.manufacturerName)) {
            result += firstSymbol + "manufacturerName=" + this.manufacturerName;
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.researchObjectTypeName)) {
            result += firstSymbol + "researchObjectTypeName=" + this.researchObjectTypeName;
            firstSymbol = joinSymbol;
        }
        return result;
    };
    Filter.prototype.isNotEmpty = function (value) {
        return value != null && value != "";
    };
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=buildMaterialsRegistryComponent.js.map