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
var http_2 = require('@angular/http');
var HttpClient = (function () {
    function HttpClient(http) {
        this.http = http;
    }
    HttpClient.prototype.addDefaultHeaders = function (headers) {
        headers.append('Auth-token', localStorage.getItem('auth_token'));
    };
    HttpClient.prototype.get = function (url, headers) {
        if (headers == null) {
            headers = new http_2.Headers();
        }
        this.addDefaultHeaders(headers);
        return this.http.get(url, { headers: headers });
    };
    HttpClient.prototype.post = function (url, data, headers) {
        if (headers == null) {
            headers = new http_2.Headers();
        }
        this.addDefaultHeaders(headers);
        return this.http.post(url, data, { headers: headers });
    };
    HttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=httpClient.js.map