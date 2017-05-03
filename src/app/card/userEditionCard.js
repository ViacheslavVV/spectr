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
var loginComponent_1 = require('../component/loginComponent');
var authService_1 = require('../service/authService');
var UserEditionCard = (function () {
    function UserEditionCard(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.changePassMsgErrPresent = false;
        this.changePassMsgSuccessPresent = true;
        this.changePassErrMsg = 'Ошибка при смене пароля!';
        this.changePassSuccessMsg = 'Пароль успешно изменен!';
        this.user = new loginComponent_1.AppUserInfo();
        authService.getUserByLogin(localStorage.getItem('login')).subscribe(function (data) { return _this.user = data.json(); });
    }
    UserEditionCard.prototype.changePassword = function () {
        var _this = this;
        this.authService.updatePass(this.userNewPass).subscribe(function (res) {
            if (res) {
                _this.onChangeSuccess();
            }
            else {
                _this.onChangeError();
            }
        }, function (error) { return _this.onChangeError(); });
    };
    UserEditionCard.prototype.onSave = function () {
        var _this = this;
        this.authService.updateUser(this.user).subscribe(function (res) {
            if (res) {
                _this.authService.updateUserData(_this.user);
                _this.onClose();
            }
            else {
                _this.onError();
            }
        }, function (error) { return _this.onError(); });
    };
    UserEditionCard.prototype.onError = function () {
        alert('Ошибка при сохранении данных!');
    };
    UserEditionCard.prototype.onClose = function () {
        this.router.navigate(['']);
    };
    UserEditionCard.prototype.changePasswordDisabled = function () {
        return !(this.strIsNotEmpty(this.userCurPass) && this.strIsNotEmpty(this.userNewPass) && this.userNewPass === this.userNewPassApprove);
    };
    UserEditionCard.prototype.onChangeSuccess = function () {
        this.changePassMsgErrPresent = false;
        this.changePassMsgSuccessPresent = true;
        this.changePassMsg = this.changePassSuccessMsg;
    };
    UserEditionCard.prototype.changePassErr = function () {
        return this.changePassMsgErrPresent == true && this.changePassMsg != null;
    };
    UserEditionCard.prototype.changePassSuccess = function () {
        return this.changePassMsgSuccessPresent == true && this.changePassMsg != null;
    };
    UserEditionCard.prototype.onChangeError = function () {
        this.changePassMsgErrPresent = true;
        this.changePassMsgSuccessPresent = false;
        this.changePassMsg = this.changePassErrMsg;
    };
    UserEditionCard.prototype.strIsNotEmpty = function (str) {
        return str != null && str != '';
    };
    UserEditionCard = __decorate([
        core_1.Component({
            selector: 'user-edit',
            providers: [authService_1.AuthService],
            templateUrl: '../../pages/card/userEditionCard.html'
        }), 
        __metadata('design:paramtypes', [authService_1.AuthService, router_1.Router])
    ], UserEditionCard);
    return UserEditionCard;
}());
exports.UserEditionCard = UserEditionCard;
//# sourceMappingURL=userEditionCard.js.map