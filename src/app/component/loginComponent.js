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
var authService_1 = require('../service/authService');
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this._errPresent = false;
        this.incorrectDataMsg = 'Некорректные логин или пароль!';
        this.serverErrorMsg = 'Ошибка сервера!';
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log(localStorage);
        this.authService.login(this.loginName, this.password).subscribe(function (data) { return data ? _this.loginOk() : _this.loginFail(); }, function (error) { return _this.loginAppFail(); });
    };
    LoginComponent.prototype.loginOk = function () {
        this.router.navigate(['']);
    };
    LoginComponent.prototype.loginFail = function () {
        this._errPresent = true;
        this.errText = this.incorrectDataMsg;
    };
    LoginComponent.prototype.loginAppFail = function () {
        this._errPresent = true;
        this.errText = this.serverErrorMsg;
    };
    LoginComponent.prototype.isError = function () {
        return this._errPresent;
    };
    LoginComponent.prototype.toRegPage = function () {
        this.router.navigate(['signUp']);
    };
    LoginComponent.prototype.restorePassword = function () {
        if (this.forgottenPassword != null && this.forgottenPassword != '') {
            this.authService.restorePassword(this.forgottenPassword);
            this.forgottenPassword = '';
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            providers: [authService_1.AuthService],
            templateUrl: '../../pages/component/loginPage.html'
        }), 
        __metadata('design:paramtypes', [authService_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
var AppUserInfo = (function () {
    function AppUserInfo() {
    }
    return AppUserInfo;
}());
exports.AppUserInfo = AppUserInfo;
//# sourceMappingURL=loginComponent.js.map