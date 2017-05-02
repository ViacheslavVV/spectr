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
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var ATTACHMENT_FILE_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/files/attfiles';
var RESEARCH_PASSPORT_FILE_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/files/resfiles';
var CREATE_ATTACHMENT_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/attach/add';
var CREATE_MANUFACTURER_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/manufacturers/add';
var CREATE_ORGANIZATION_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/organization/add';
var CREATE_QUALITY_STANDART_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/qstandarts/add';
var CREATE_RESEARCH_METHOD_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/resmethod/add';
var CREATE_RESEARCH_OBJECT_TYPE_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/rotype/add';
var CREATE_RESEARCH_PASSPORT_URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/rpass/add';
var CreationsService = (function () {
    function CreationsService(httpClient) {
        this.httpClient = httpClient;
    }
    CreationsService.prototype.createAttachmentUploader = function (fileName) {
        this.attachmentUploader = new ng2_file_upload_1.FileUploader({ url: ATTACHMENT_FILE_URL, headers: [{ name: 'filename', value: fileName }] });
    };
    CreationsService.prototype.createResearchPassportUploader = function (fileName) {
        this.researchPassportUploader = new ng2_file_upload_1.FileUploader({ url: RESEARCH_PASSPORT_FILE_URL, headers: [{ name: 'filename', value: fileName }] });
    };
    CreationsService.prototype.createAttachment = function (attachment) {
        return this.httpClient.post(CREATE_ATTACHMENT_URL, attachment);
    };
    CreationsService.prototype.createManufacturer = function (manufacturer) {
        return this.httpClient.post(CREATE_MANUFACTURER_URL, manufacturer);
    };
    CreationsService.prototype.createOrganization = function (organization) {
        return this.httpClient.post(CREATE_ORGANIZATION_URL, organization);
    };
    CreationsService.prototype.createQualityStandart = function (qualityStandart) {
        return this.httpClient.post(CREATE_QUALITY_STANDART_URL, qualityStandart);
    };
    CreationsService.prototype.createResearchMethod = function (researchMethod) {
        return this.httpClient.post(CREATE_RESEARCH_METHOD_URL, researchMethod);
    };
    CreationsService.prototype.createResearchObjectType = function (researchObjectType) {
        return this.httpClient.post(CREATE_RESEARCH_OBJECT_TYPE_URL, researchObjectType);
    };
    CreationsService.prototype.createResearchPassport = function (researchPassport) {
        return this.httpClient.post(CREATE_RESEARCH_PASSPORT_URL, researchPassport);
    };
    CreationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpClient_1.HttpClient])
    ], CreationsService);
    return CreationsService;
}());
exports.CreationsService = CreationsService;
//# sourceMappingURL=creationService.js.map