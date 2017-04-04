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
var MutliSelectDropdownComponent = (function () {
    function MutliSelectDropdownComponent() {
        this.selectionModel = [];
        this.selectionModelChange = new core_1.EventEmitter();
        this.isOpen = false;
        this.searchFilter = '';
        this.allowMultiselect = true;
    }
    MutliSelectDropdownComponent.prototype.toggleDropdown = function () {
        this.isOpen = !this.isOpen;
    };
    MutliSelectDropdownComponent.prototype.al = function () {
        alert('focus blured');
    };
    MutliSelectDropdownComponent.prototype.list = function (e) {
        console.log(e);
    };
    MutliSelectDropdownComponent.prototype.getLabel = function () {
        return this.allowMultiselect ? 'Выбрано ' + this.selectionModel.length :
            (this.selectionModel == null || this.selectionModel.length == 0) ? 'Выберите значение' : this.selectionModel[0].text;
    };
    MutliSelectDropdownComponent.prototype.clearSearch = function () {
        this.searchFilter = '';
    };
    MutliSelectDropdownComponent.prototype.isShowItem = function (txt) {
        return txt.toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0;
    };
    MutliSelectDropdownComponent.prototype.deselectAll = function (ev) {
        this.selectionModel = [];
        this.clearSearch();
        this.onUpdate();
        ev.preventDefault();
    };
    MutliSelectDropdownComponent.prototype.isChecked = function (id) {
        return this.selectionModel.findIndex(function (itm) { return itm.id == id; }) >= 0;
    };
    MutliSelectDropdownComponent.prototype.onUpdate = function () {
        this.selectionModelChange.emit(this.selectionModel);
    };
    MutliSelectDropdownComponent.prototype.toggleSelectedItem = function (ev, item, isChecked) {
        if (isChecked) {
            this.selectionModel = this.selectionModel.filter(function (itm) { return itm.id != item.id; });
            this.onUpdate();
            ev.preventDefault();
            return;
        }
        if (!this.allowMultiselect && this.selectionModel.length > 0) {
            return;
        }
        var idx = this.selectionModel.findIndex(function (itm) { return itm.id == item.id; });
        if (idx >= 0) {
            this.selectionModel.splice(idx, 1);
        }
        else {
            this.selectionModel.push(item);
        }
        this.onUpdate();
        ev.preventDefault();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MutliSelectDropdownComponent.prototype, "selectionModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MutliSelectDropdownComponent.prototype, "items", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MutliSelectDropdownComponent.prototype, "selectionModelChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MutliSelectDropdownComponent.prototype, "isOpen", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MutliSelectDropdownComponent.prototype, "allowMultiselect", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], MutliSelectDropdownComponent.prototype, "list", null);
    MutliSelectDropdownComponent = __decorate([
        core_1.Component({
            selector: 'multi-select-dropdown',
            template: "<div class=\"multiselect-parent btn-group dropdown-multiselect\">\n      <button type=\"button\" class=\"dropdown-toggle btn btn-default\" (click)=\"toggleDropdown();\">\n        <span>{{getLabel()}}</span>\n        &nbsp;<span class=\"caret\"></span>\n      </button>\n      <ul class=\"dropdown-menu dropdown-menu-form\" [style.display]=\"isOpen ? 'block' : 'none'\" style=\"overflow: scroll\">\n        <li *ngIf=\"allowMultiselect\"><a href=\"#\" (click)=\"deselectAll($event);\"><span class=\"glyphicon glyphicon-remove\" ></span>&nbsp;\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0441\u0435</a></li>\n      <li>\n        <div class=\"dropdown-header\">\n          <div class=\"control-group\">\n            <div class=\"input-group\">\n              <input type=\"text\" class=\"form-control\" [(ngModel)]=\"searchFilter\" placeholder=\"Search\" />\n              <span class=\"glyphicon glyphicon-remove input-group-addon\" style=\"top: 0px;\" (click)=\"clearSearch()\"></span>\n            </div>\n          </div>\n        </div>\n      </li>\n        <li role=\"presentation\" *ngFor=\"let item of items\">\n          <a href=\"#\" role=\"menuitem\" (click)=\"toggleSelectedItem($event, item, isChecked(item.id))\">\n            <span class=\"glyphicon\" [class.glyphicon-ok]=\"isChecked(item.id)\"></span>\n            {{item.text}}\n          </a>\n          </li>\n        <li *ngIf=\"items == null || items.length == 0\">No items</li>\n      </ul>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MutliSelectDropdownComponent);
    return MutliSelectDropdownComponent;
}());
exports.MutliSelectDropdownComponent = MutliSelectDropdownComponent;
//# sourceMappingURL=multiselectComponent.js.map