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
var ng2_toasty_1 = require('ng2-toasty');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var CreationComponent = (function () {
    function CreationComponent(creationsService, dropdownProviderService, router, toastyService) {
        this.creationsService = creationsService;
        this.dropdownProviderService = dropdownProviderService;
        this.router = router;
        this.toastyService = toastyService;
        this.fileUploadUrl = '/files/upload';
        this.uploader = new ng2_file_upload_1.FileUploader({ url: this.fileUploadUrl });
        this.types = [{ value: 'ATTACHMENT', name: 'Приложение' }, { value: 'RESEARCH_PASSPORT', name: 'Паспорт исследования' }, { value: 'SPECTR', name: 'Спектр' }];
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
        //TODO для 2 выпадающих списков файлов
        this.dropdownProviderService.getResearchMethods().subscribe(function (data) { return _this.resPassResMethodsData = data; }, function (error) { return _this.resPassResMethodsData = new Array(); });
        this.dropdownProviderService.getResearchObjecs().subscribe(function (data) { return _this.resPassResObjectsData = data; }, function (error) { return _this.resPassResObjectsData = new Array(); });
        this.dropdownProviderService.getResearchObjecs().subscribe(function (data) { return _this.attachmentResearchObjectsData = data; }, function (error) { return _this.attachmentResearchObjectsData = new Array(); });
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
        this.attachment.researchObject = this.getFirstIdOrNull(this.attachmentResearchObject);
        this.attachment.fileId = this.getFirstIdOrNull(this.attachmentFile);
        this.creationsService.createAttachment(this.attachment);
    };
    CreationComponent.prototype.createResearchPassport = function () {
        this.researchPassport.fileId = this.getFirstIdOrNull(this.resPassFile);
        this.researchPassport.researchMethod = this.getFirstIdOrNull(this.resPassResMethod);
        this.researchPassport.researchObject = this.getFirstIdOrNull(this.resPassResObject);
        this.creationsService.createResearchPassport(this.researchPassport);
    };
    CreationComponent.prototype.createResearchMethod = function () {
        this.creationsService.createResearchMethod(this.researchMethod);
    };
    CreationComponent.prototype.uploadFile = function () {
        //TODO
        console.log(this.uploader.options);
        this.fileItem = this.uploader.queue[this.uploader.queue.length - 1];
        ng2_file_upload_1.FileItem.prototype._form = this;
        this.fileItem.onSuccess = this.onUploadSuccess;
        this.fileItem.onError = this.onUploadError;
        this.fileItem.onCancel = this.onUploadCancel;
        this.fileItem.upload();
        this.onUploadStart();
    };
    CreationComponent.prototype.onUploadStart = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла началась!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        this.toastyService.info(toastOptions);
    };
    CreationComponent.prototype.onUploadSuccess = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Файл успешно загружен!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        ng2_file_upload_1.FileItem.prototype._form.toastyService.success(toastOptions);
    };
    CreationComponent.prototype.onUploadError = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Ошибка загрузки файла!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        ng2_file_upload_1.FileItem.prototype._form.toastyService.error(toastOptions);
    };
    CreationComponent.prototype.onUploadCancel = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла отменена!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        ng2_file_upload_1.FileItem.prototype._form.toastyService.error(toastOptions);
    };
    CreationComponent.prototype.initUploader = function () {
        var fileHeaders = [{ name: 'FILE_TYPE', value: this.fileType }, { name: 'FILE_NAME', value: this.fileName }];
        this.uploader.options.headers = fileHeaders;
    };
    CreationComponent.prototype.getFirstIdOrNull = function (arr) {
        return arr.length == 0 ? null : arr[0].id;
    };
    CreationComponent.prototype.uploadDisabled = function () {
        return this.uploader.isUploading || !(this.fileType != null && this.fileType != '' && this.fileName != null && this.fileName != '');
    };
    CreationComponent = __decorate([
        core_1.Component({
            selector: '<creation-card>',
            templateUrl: '../../pages/card/creationCard.html',
            providers: [creationService_1.CreationsService, ng2_toasty_1.ToastyService]
        }), 
        __metadata('design:paramtypes', [creationService_1.CreationsService, dropdownProviderService_1.DropdownProviderService, router_1.Router, ng2_toasty_1.ToastyService])
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