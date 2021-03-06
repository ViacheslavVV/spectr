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
var authService_1 = require('./service/authService');
var router_1 = require('@angular/router');
var TopMenuPanelComponent = (function () {
    function TopMenuPanelComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    TopMenuPanelComponent.prototype.getUserLogin = function () {
        return localStorage.getItem('login');
    };
    TopMenuPanelComponent.prototype.getUserFio = function () {
        return localStorage.getItem('fio');
    };
    TopMenuPanelComponent.prototype.getEmail = function () {
        return localStorage.getItem('email');
    };
    TopMenuPanelComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    TopMenuPanelComponent.prototype.logOut = function () {
        this.authService.logout();
        this.router.navigate(['login']);
    };
    TopMenuPanelComponent = __decorate([
        core_1.Component({
            selector: 'top-menu',
            templateUrl: '../pages/TopMenuPanel.html',
            providers: [authService_1.AuthService]
        }), 
        __metadata('design:paramtypes', [authService_1.AuthService, router_1.Router])
    ], TopMenuPanelComponent);
    return TopMenuPanelComponent;
}());
exports.TopMenuPanelComponent = TopMenuPanelComponent;
//# sourceMappingURL=topMenuPanel.js.map