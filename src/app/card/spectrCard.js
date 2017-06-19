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
var spectrsRegistryService_1 = require("../service/spectrsRegistryService");
var dropdownProviderService_1 = require('../service/dropdownProviderService');
var globalSettings_1 = require('../service/globalSettings');
var ng2_toasty_1 = require('ng2-toasty');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var SpectrCardComponent = (function () {
    function SpectrCardComponent(toastyService, spectrsService, dropdownProviderService, router) {
        var _this = this;
        this.toastyService = toastyService;
        this.spectrsService = spectrsService;
        this.dropdownProviderService = dropdownProviderService;
        this.router = router;
        this.fileUploadUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + '/files/uploadImg';
        this.uploader = new ng2_file_upload_1.FileUploader({ url: this.fileUploadUrl });
        /**
         * ид файла спектра
         */
        this.spectrBaseId = null;
        /**
         * данные для выпадающего списка (researchPassportId) allowMultiselect = false
         */
        this.researchPassportsData = new Array();
        this.selectedResearchPassport = [];
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
        this.spectr = new Spectr();
        this.dropdownProviderService.getResearchPassports().subscribe(function (data) { return _this.researchPassportsData = data; }, function (error) { return _this.researchPassportsData = new Array(); });
        this.dropdownProviderService.getSpectrLines().subscribe(function (data) { return _this.spectrLinesData = data; }, function (error) { return _this.spectrLinesData = new Array(); });
        this.dropdownProviderService.getChemicalElements().subscribe(function (data) { return _this.chemicalElementsData = data; }, function (error) { return _this.chemicalElementsData = new Array(); });
    }
    /**
     * Установить все id из выпадающий списков в объект
     */
    SpectrCardComponent.prototype.setIdsToObject = function () {
        this.spectr.spectrLine = this.getFirstIdOrNull(this.selectedSpectrLine);
        this.spectr.researchPassport = this.getFirstIdOrNull(this.selectedResearchPassport);
        this.spectr.chemicalElement = this.getFirstIdOrNull(this.selectedChemicalElement);
    };
    SpectrCardComponent.prototype.setFileId = function () {
        this.spectr.spectrBase = this.spectrBaseId;
    };
    SpectrCardComponent.prototype.getFirstIdOrNull = function (arr) {
        return arr.length == 0 ? null : arr[0].id;
    };
    SpectrCardComponent.prototype.afterUpload = function () {
        var _this = this;
        this.setIdsToObject();
        this.setFileId();
        this.spectrsService.createSpectr(this.spectr).subscribe(function (data) { console.log(data); _this.toRegistr(); }, function (error) { return console.log(error); });
    };
    SpectrCardComponent.prototype.toRegistr = function () {
        this.router.navigate(['spectrs']);
    };
    SpectrCardComponent.prototype.onSave = function () {
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
    SpectrCardComponent.prototype.onUploadStart = function () {
        var toastOptions = {
            title: "Загрузка файла:",
            msg: "Загрузка файла началась!",
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        this.toastyService.info(toastOptions);
    };
    SpectrCardComponent = __decorate([
        core_1.Component({
            selector: '<spectr>',
            templateUrl: '../../pages/card/spectrCard.html',
            providers: [spectrsRegistryService_1.SpectrsService, ng2_toasty_1.ToastyService]
        }), 
        __metadata('design:paramtypes', [ng2_toasty_1.ToastyService, spectrsRegistryService_1.SpectrsService, dropdownProviderService_1.DropdownProviderService, router_1.Router])
    ], SpectrCardComponent);
    return SpectrCardComponent;
}());
exports.SpectrCardComponent = SpectrCardComponent;
var Spectr = (function () {
    function Spectr() {
    }
    return Spectr;
}());
exports.Spectr = Spectr;
//# sourceMappingURL=spectrCard.js.map