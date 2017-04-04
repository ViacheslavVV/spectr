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
var researchObjectsService_1 = require("../service/researchObjectsService");
var ResearchObjectsRegistryComponent = (function () {
    function ResearchObjectsRegistryComponent(researchObjectService) {
        this.researchObjectService = researchObjectService;
        this.mode = 'Observable';
        this.filter = new Filter();
    }
    ResearchObjectsRegistryComponent.prototype.aa = function () {
        console.log(this.filter);
        console.log(this.filter.getAsGetParams());
        this.getResearchObjects();
    };
    ResearchObjectsRegistryComponent.prototype.ngOnInit = function () { this.getResearchObjects(); };
    ResearchObjectsRegistryComponent.prototype.getResearchObjects = function () {
        var _this = this;
        console.log("getResearchObjects component");
        this.researchObjectService.getResearchObjects(this.filter)
            .subscribe(function (data) { return _this.data = data; }, function (error) { return _this.errorMessage = error; });
    };
    ResearchObjectsRegistryComponent = __decorate([
        core_1.Component({
            selector: '<research-objects>',
            templateUrl: '../pages/researchObjectsRegistryComponents.html',
            providers: [researchObjectsService_1.ResearchObjectsService]
        }), 
        __metadata('design:paramtypes', [researchObjectsService_1.ResearchObjectsService])
    ], ResearchObjectsRegistryComponent);
    return ResearchObjectsRegistryComponent;
}());
exports.ResearchObjectsRegistryComponent = ResearchObjectsRegistryComponent;
var Filter = (function () {
    function Filter() {
        this.name = null;
        this.date = null;
        this.organizationName = null;
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
        if (this.date != null) {
            result += firstSymbol + "date=" + this.date.toLocaleDateString();
            firstSymbol = joinSymbol;
        }
        if (this.isNotEmpty(this.organizationName)) {
            result += firstSymbol + "organizationName=" + this.organizationName;
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
//# sourceMappingURL=researchObjectsRegistryComponent.js.map