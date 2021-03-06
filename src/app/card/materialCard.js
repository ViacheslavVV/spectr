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
var materialsService_1 = require("../service/materialsService");
var MaterialCardComponent = (function () {
    function MaterialCardComponent(materialsService, router) {
        this.materialsService = materialsService;
        this.router = router;
        /**
         * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
         */
        this.material = new Material();
    }
    MaterialCardComponent.prototype.onSave = function () {
        var _this = this;
        if (this.material.probeDateOrig != null) {
            this.material.probeDate = this.material.probeDateOrig.toLocaleDateString();
        }
        else {
            this.material.probeDate = null;
        }
        this.materialsService.createMaterial(this.material).subscribe(function (data) { console.log(data); _this.toRegistr(); }, function (error) { return console.log(error); });
    };
    MaterialCardComponent.prototype.toRegistr = function () {
        this.router.navigate(['materials']);
    };
    MaterialCardComponent = __decorate([
        core_1.Component({
            selector: '<material>',
            templateUrl: '../../pages/card/materialCard.html',
            providers: [materialsService_1.MaterialsService]
        }), 
        __metadata('design:paramtypes', [materialsService_1.MaterialsService, router_1.Router])
    ], MaterialCardComponent);
    return MaterialCardComponent;
}());
exports.MaterialCardComponent = MaterialCardComponent;
var Material = (function () {
    function Material() {
    }
    return Material;
}());
exports.Material = Material;
//# sourceMappingURL=materialCard.js.map