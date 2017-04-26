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
var http_1 = require('@angular/http');
var globalSettings_1 = require('../service/globalSettings');
var httpClient_1 = require('../service/httpClient');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.authUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/au/login"; // url to get login
        this.loginCheckUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/au/check";
        this.signUpUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/au/reg";
        this.logoutUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/au/logout";
        this.restorePasswordUrl = globalSettings_1.GlobalSettings.SERVER_ADDRESS + "/au/passrec";
    }
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('loggedIn') == 'true';
    };
    AuthService.prototype.login = function (login, password) {
        var headers = new http_1.Headers();
        headers.append('login', login);
        headers.append('password', password);
        return this.http
            .post(this.authUrl, {}, headers)
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res.success == true || res.success == 'true') {
                localStorage.setItem('auth_token', res.authToken);
                localStorage.setItem('loggedIn', 'true');
                return true;
            }
            return false;
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.setItem('loggedIn', 'false');
        this.http.post(this.logoutUrl, {}).subscribe(function (data) { return console.log('loggedOut'); });
        localStorage.removeItem('auth_token');
    };
    AuthService.prototype.checkLogin = function (login) {
        return this.http.post(this.loginCheckUrl, login).map(function (res) { return res.json(); });
    };
    AuthService.prototype.signUp = function (userSignUpData) {
        return this.http.post(this.signUpUrl, userSignUpData).map(function (res) { return res.json(); });
    };
    AuthService.prototype.restorePassword = function (login) {
        var headers = new http_1.Headers();
        headers.append('login', login);
        this.http.post(this.restorePasswordUrl, {}, headers).subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpClient_1.HttpClient])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map