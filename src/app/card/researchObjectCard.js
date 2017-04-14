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
var researchObjectsService_1 = require("../service/researchObjectsService");
var dropdownProviderService_1 = require('../service/dropdownProviderService');
var ResearchObjectCardComponent = (function () {
    function ResearchObjectCardComponent(researchObjectsService, dropdownProviderService, router) {
        var _this = this;
        this.researchObjectsService = researchObjectsService;
        this.dropdownProviderService = dropdownProviderService;
        this.router = router;
        /**
         * данные для выпадающего списка (organizationId) allowMultiselect = false
         */
        this.organizationsData = new Array();
        this.selectedOrganization = [];
        /**
         * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
         */
        this.researchObject = new ResearchObject();
        this.dropdownProviderService.getOrganizations().subscribe(function (data) { return _this.organizationsData = data; }, function (error) { return _this.organizationsData = new Array(); });
    }
    /**
     * Установить все id из выпадающий списков в объект
     */
    ResearchObjectCardComponent.prototype.setIdsToObject = function () {
        this.researchObject.organization = this.getFirstIdOrNull(this.selectedOrganization);
    };
    ResearchObjectCardComponent.prototype.getFirstIdOrNull = function (arr) {
        return arr.length == 0 ? null : arr[0].id;
    };
    ResearchObjectCardComponent.prototype.onSave = function () {
        var _this = this;
        this.setIdsToObject();
        if (this.researchObject.dateOrig != null) {
            this.researchObject.date = this.researchObject.dateOrig.toLocaleDateString();
        }
        else {
            this.researchObject.date = null;
        }
        this.researchObjectsService.createResearchObject(this.researchObject).subscribe(function (data) { console.log(data); _this.toRegistr(); }, function (error) { return console.log(error); });
    };
    ResearchObjectCardComponent.prototype.toRegistr = function () {
        this.router.navigate(['researchObjects']);
    };
    ResearchObjectCardComponent = __decorate([
        core_1.Component({
            selector: '<research-object>',
            templateUrl: '../../pages/card/researchObjectCard.html',
            providers: [researchObjectsService_1.ResearchObjectsService]
        }), 
        __metadata('design:paramtypes', [researchObjectsService_1.ResearchObjectsService, dropdownProviderService_1.DropdownProviderService, router_1.Router])
    ], ResearchObjectCardComponent);
    return ResearchObjectCardComponent;
}());
exports.ResearchObjectCardComponent = ResearchObjectCardComponent;
var ResearchObject = (function () {
    function ResearchObject() {
    }
    return ResearchObject;
}());
exports.ResearchObject = ResearchObject;
//# sourceMappingURL=researchObjectCard.js.map