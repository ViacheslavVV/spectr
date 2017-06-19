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
var etalonSpectrsService_1 = require("../service/etalonSpectrsService");
var dropdownProviderService_1 = require('../service/dropdownProviderService');
var globalSettings_1 = require('../service/globalSettings');
var ng2_toasty_1 = require('ng2-toasty');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var EtalonSpectrCardComponent = (function () {
    function EtalonSpectrCardComponent(toastyService, etalonSpectrsService, dropdownProviderService, router) {
        var _this = this;
        this.toastyService = toastyService;
        this.etalonSpectrsService = etalonSpectrsService;
        this.dropdownProviderService = dropdownProviderService;
        this.router = router;
        this.fileUploadUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/files/uploadImg';
        this.uploader = new ng2_file_upload_1.FileUploader({ url: this.fileUploadUrl });
        /**
         * ид файла спектра
         */
        this.spectrBaseId = null;
        /**
         * данные для выпадающего списка (materialId) allowMultiselect = false
         */
        this.materialsData = new Array();
        this.selectedMaterial = [];
        /**
         * данные для выпадающего списка (buildMaterialId) allowMultiselect = false
         */
        this.buildMaterialsData = new Array();
        this.selectedBuildMaterial = [];
        /**
         * данные для выпадающего списка (spectrLineId) allowMultiselect = false
         */
        this.spectrLinesData = new Array();
        this.selectedSpectrLine = [];
        /**
         * данные для выпадающего списка (chemicalElementId) allowMultiselect = false
         */
        this.chemicalElementsData = new Array();
        this.selectedChemicalElement = [];
        /**
         * новый элемент, ПРИВЯЗКА К НЕМУ, А СПИСКИ УСТАНОВИТЬ ПОСЛЕ НАЖАТИЯ "СОХРАНИТЬ"
         */
        this.etalonSpectr = new EtalonSpectr();
        this.dropdownProviderService.getMaterials().subscribe(function (data) { return _this.materialsData = data; }, function (error) { return _this.materialsData = new Array(); });
        this.dropdownProviderService.getBuildMaterials().subscribe(function (data) { return _this.buildMaterialsData = data; }, function (error) { return _this.buildMaterialsData = new Array(); });
        this.dropdownProviderService.getSpectrLines().subscribe(function (data) { return _this.spectrLinesData = data; }, function (error) { return _this.spectrLinesData = new Array(); });
        this.dropdownProviderService.getChemicalElements().subscribe(function (data) { return _this.chemicalElementsData = data; }, function (error) { return _this.chemicalElementsData = new Array(); });
    }
    /**
     * Установить все id из выпадающий списков в объект
     */
    EtalonSpectrCardComponent.prototype.setIdsToObject = function () {
        this.etalonSpectr.material = this.getFirstIdOrNull(this.selectedMaterial);
        this.etalonSpectr.buildMaterial = this.getFirstIdOrNull(this.selectedBuildMaterial);
        this.etalonSpectr.spectrLine = this.getFirstIdOrNull(this.selectedSpectrLine);
        this.etalonSpectr.chemicalElement = this.getFirstIdOrNull(this.selectedChemicalElement);
    };
    EtalonSpectrCardComponent.prototype.getFirstIdOrNull = function (arr) {
        return arr.length == 0 ? null : arr[0].id;
    };
    EtalonSpectrCardComponent.prototype.setFileId = function () {
        this.etalonSpectr.spectrBase = this.spectrBaseId;
    };
    EtalonSpectrCardComponent.prototype.afterUpload = function () {
        var _this = this;
        this.setIdsToObject();
        this.setFileId();
        console.log(this.etalonSpectr);
        this.etalonSpectrsService.createEtalonSpectr(this.etalonSpectr).subscribe(function (data) { console.log(data); _this.toRegistr(); }, function (error) { return console.log(error); });
    };
    EtalonSpectrCardComponent.prototype.toRegistr = function () {
        this.router.navigate(['spectrs/etalon']);
    };
    EtalonSpectrCardComponent.prototype.onSave = function () {
        var _this = this;
        //TODO
        this.fileItem = this.uploader.queue[this.uploader.queue.length - 1];
        this.fileItem.onSuccess = function (response, status, headers) {
            _this.spectrBaseId = JSON.parse(response).id;
            var toastOptions = {
                title: "Загрузка файла:",
                msg: "Файл успешно загружен!",
                showClose: true,
                timeout: 5000,
                theme: 'default'
            };
            _this.toastyService.success(toastOptions);
            _this.afterUpload();
        };
        this.fileItem.onError = function () {
            var toastOptions = {
                title: "Загрузка файла:",
                msg: "Ошибка загрузки файла!",
                showClose: true,
                timeout: 5000,
                theme: 'default'
            };
            _this.toastyService.error(toastOptions);
        };
        this.fileItem.onCancel = function () {
            var toastOptions = {
                title: "Загрузка файла:",
                msg: "Загрузка файла отменена!",
                showClose: true,
                timeout: 5000,
                theme: 'default'
            };
            _this.toastyService.error(toastOptions);
        };
        this.fileItem.upload();
        this.onUploadStart();
    };
    EtalonSpectrCardComponent.prototype.onUploadStart = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла началась!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        this.toastyService.info(toastOptions);
    };
    EtalonSpectrCardComponent = __decorate([
        core_1.Component({
            selector: '<etalon-spectr>',
            templateUrl: '../../pages/card/etalonSpectrCard.html',
            providers: [etalonSpectrsService_1.EtalonSpectrsService, ng2_toasty_1.ToastyService]
        }), 
        __metadata('design:paramtypes', [ng2_toasty_1.ToastyService, etalonSpectrsService_1.EtalonSpectrsService, dropdownProviderService_1.DropdownProviderService, router_1.Router])
    ], EtalonSpectrCardComponent);
    return EtalonSpectrCardComponent;
}());
exports.EtalonSpectrCardComponent = EtalonSpectrCardComponent;
var EtalonSpectr = (function () {
    function EtalonSpectr() {
    }
    return EtalonSpectr;
}());
exports.EtalonSpectr = EtalonSpectr;
//# sourceMappingURL=etalonSpectrCard.js.map