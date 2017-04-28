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
var creationService_1 = require("../service/creationService");
var dropdownProviderService_1 = require('../service/dropdownProviderService');
var CreationComponent = (function () {
    function CreationComponent(creationsService, dropdownProviderService, router) {
        this.creationsService = creationsService;
        this.dropdownProviderService = dropdownProviderService;
        this.router = router;
        /**
         * данные для выпадающего списка (attachmentResearchObjectId)
         */
        this.attachmentResearchObjectsData = new Array();
        this.attachmentResearchObject = [];
        /**
         * данные для выпадающего списка (attachmentFileId)
         */
        this.attachmentFilesData = new Array();
        this.attachmentFile = [];
        /**
         * данные для выпадающего списка (resPassResMethodId)
         */
        this.resPassResMethodsData = new Array();
        this.resPassResMethod = [];
        /**
         * данные для выпадающего списка (resPassResObjectId)
         */
        this.resPassResObjectsData = new Array();
        this.resPassResObject = [];
        /**
         * данные для выпадающего списка (resPassFileId)
         */
        this.resPassFilesData = new Array();
        this.resPassFile = [];
        this.qualityStandart = new QualityStandart();
        this.researchObjectType = new ResearchObjectType();
        this.manufacturer = new Manufacturer();
        this.organization = new Organization();
        this.attachment = new Attachment();
        this.researchPassport = new ResearchPassport();
        this.researchMethod = new ResearchMethod();
        this.refreshDropdowns();
    }
    /**
     * Обновить данные выпадающих списков
     */
    CreationComponent.prototype.refreshDropdowns = function () {
        var _this = this;
        //TODO для 5 выпадающих списков
        /*
        this.dropdownProviderService.getQualityStandarts().subscribe(data => this.qualityStandartsData = data , error => this.qualityStandartsData = new Array<DropdownItem>());
        this.dropdownProviderService.getMaterials().subscribe(data => this.materialsData =  data, error => this.materialsData = new Array<DropdownItem>());
        this.dropdownProviderService.getManufacturers().subscribe(data => this.manufacturerData =  data , error => this.manufacturerData = new Array<DropdownItem>());
        */
        this.dropdownProviderService.getResearchObjecs().subscribe(function (data) { return _this.resPassResObjectsData = data; }, function (error) { return _this.resPassResObjectsData = new Array(); });
        this.dropdownProviderService.getResearchObjecs().subscribe(function (data) { return _this.attachmentResearchObject = data; }, function (error) { return _this.attachmentResearchObject = new Array(); });
    };
    CreationComponent.prototype.createQualityStandart = function () {
        this.creationsService.createQualityStandart(this.qualityStandart);
    };
    CreationComponent.prototype.createResearchObjectType = function () {
        this.creationsService.createResearchObjectType(this.researchObjectType);
    };
    CreationComponent.prototype.createManufacturer = function () {
        this.creationsService.createManufacturer(this.manufacturer);
    };
    CreationComponent.prototype.createOrganization = function () {
        this.creationsService.createOrganization(this.organization);
    };
    CreationComponent.prototype.createAttachment = function () {
        this.creationsService.createAttachment(this.attachment);
    };
    CreationComponent.prototype.createResearchPassport = function () {
        this.creationsService.createResearchPassport(this.researchPassport);
    };
    CreationComponent.prototype.createResearchMethod = function () {
        this.creationsService.createResearchMethod(this.researchMethod);
    };
    CreationComponent.prototype.toRegistr = function () {
        this.router.navigate(['materials/build']);
    };
    CreationComponent = __decorate([
        core_1.Component({
            selector: '<creation-card>',
            templateUrl: '../../pages/card/creationCard.html',
            providers: [creationService_1.CreationsService]
        }), 
        __metadata('design:paramtypes', [creationService_1.CreationsService, dropdownProviderService_1.DropdownProviderService, router_1.Router])
    ], CreationComponent);
    return CreationComponent;
}());
exports.CreationComponent = CreationComponent;
var QualityStandart = (function () {
    function QualityStandart() {
    }
    return QualityStandart;
}());
exports.QualityStandart = QualityStandart;
var ResearchObjectType = (function () {
    function ResearchObjectType() {
    }
    return ResearchObjectType;
}());
exports.ResearchObjectType = ResearchObjectType;
var Manufacturer = (function () {
    function Manufacturer() {
    }
    return Manufacturer;
}());
exports.Manufacturer = Manufacturer;
var Organization = (function () {
    function Organization() {
    }
    return Organization;
}());
exports.Organization = Organization;
var Attachment = (function () {
    function Attachment() {
    }
    return Attachment;
}());
exports.Attachment = Attachment;
var ResearchPassport = (function () {
    function ResearchPassport() {
    }
    return ResearchPassport;
}());
exports.ResearchPassport = ResearchPassport;
var ResearchMethod = (function () {
    function ResearchMethod() {
    }
    return ResearchMethod;
}());
exports.ResearchMethod = ResearchMethod;
//# sourceMappingURL=creationCard.js.map