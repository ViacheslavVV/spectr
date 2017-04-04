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
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var ng2_toasty_1 = require('ng2-toasty');
var ngx_modal_1 = require('ngx-modal');
var URL = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/files/upload';
var MaterialsRegistryComponent = (function () {
    function MaterialsRegistryComponent(materialsService, toastyService) {
        this.materialsService = materialsService;
        this.toastyService = toastyService;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.mode = 'Observable';
        this.firstModal = new ngx_modal_1.Modal();
        this.filter = new Filter();
    }
    MaterialsRegistryComponent.prototype.isEnabled = function () {
        return this.fileItem != null && this.fileItem.isError;
    };
    MaterialsRegistryComponent.prototype.onUploadStart = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла началась!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        this.toastyService.info(toastOptions);
    };
    MaterialsRegistryComponent.prototype.onUploadSuccess = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Файл успешно загружен!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        ng2_file_upload_1.FileItem.prototype._form.toastyService.success(toastOptions);
    };
    MaterialsRegistryComponent.prototype.onUploadError = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Ошибка загрузки файла!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        ng2_file_upload_1.FileItem.prototype._form.toastyService.error(toastOptions);
    };
    MaterialsRegistryComponent.prototype.onUploadCancel = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла отменена!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        ng2_file_upload_1.FileItem.prototype._form.toastyService.error(toastOptions);
    };
    MaterialsRegistryComponent.prototype.aa = function () {
        console.log(this.filter);
        console.log(this.filter.getAsGetParams());
        console.log(this.uploader);
        this.getMaterials();
    };
    MaterialsRegistryComponent.prototype.uploadMyFile = function () {
        this.fileItem = this.uploader.queue[this.uploader.queue.length - 1];
        ng2_file_upload_1.FileItem.prototype._form = this;
        this.fileItem.onSuccess = this.onUploadSuccess;
        this.fileItem.onError = this.onUploadError;
        this.fileItem.onCancel = this.onUploadCancel;
        this.fileItem.upload();
        this.onUploadStart();
    };
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
            providers: [materialsService_1.MaterialsService, ng2_toasty_1.ToastyService]
        }), 
        __metadata('design:paramtypes', [materialsService_1.MaterialsService, ng2_toasty_1.ToastyService])
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