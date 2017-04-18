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
var SignUpComponent = (function () {
    function SignUpComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.userSignUpData = new UserSignUpData();
        this._errPresent = false;
        this.loginExists = 'Логин занят!';
        this.serverErrorMsg = 'Ошибка сервера!';
    }
    SignUpComponent.prototype.signUp = function () {
        var _this = this;
        if (this.userSignUpData.isValid()) {
            this.authService.checkLogin(this.userSignUpData.loginName).subscribe(function (result) { return result ? _this.onValidSignUp() : _this.loginExistsFail(); }, function (error) { return _this.signUpAppFail(); });
        }
    };
    SignUpComponent.prototype.onValidSignUp = function () {
        var _this = this;
        this.authService.signUp(this.userSignUpData).subscribe(function (data) { return data ? _this.signUpOk() : _this.signUpFail(); }, function (error) { return _this.signUpAppFail(); });
    };
    SignUpComponent.prototype.signUpOk = function () {
        this.router.navigate(['login']);
    };
    SignUpComponent.prototype.signUpFail = function () {
        this._errPresent = true;
        this.errText = this.serverErrorMsg;
    };
    SignUpComponent.prototype.signUpAppFail = function () {
        this._errPresent = true;
        this.errText = this.serverErrorMsg;
    };
    SignUpComponent.prototype.loginExistsFail = function () {
        this._errPresent = true;
        this.errText = this.loginExists;
    };
    SignUpComponent.prototype.isError = function () {
        return this._errPresent;
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'sign-up',
            providers: [authService_1.AuthService],
            templateUrl: '../../pages/component/signUp.html'
        }), 
        __metadata('design:paramtypes', [authService_1.AuthService, router_1.Router])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
var UserSignUpData = (function () {
    function UserSignUpData() {
    }
    UserSignUpData.prototype.isValid = function () {
        return true;
    };
    return UserSignUpData;
}());
exports.UserSignUpData = UserSignUpData;
//# sourceMappingURL=signUpComponent.js.map