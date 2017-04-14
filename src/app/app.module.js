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
var platform_browser_1 = require('@angular/platform-browser');
var angular2_datatable_1 = require("angular2-datatable");
var topMenuPanel_1 = require('./topMenuPanel');
var basePageStructure_1 = require('./basePageStructure');
var forms_1 = require('@angular/forms');
var primeng_1 = require('primeng/primeng');
var http_1 = require('@angular/http');
//registry imports
var buildMaterialsRegistryComponent_1 = require('./registry/buildMaterialsRegistryComponent');
var buildMaterialCard_1 = require('./card/buildMaterialCard');
var spectrsRegistryComponent_1 = require('./registry/spectrsRegistryComponent');
var spectrCard_1 = require('./card/spectrCard');
var researchObjectsRegistryComponent_1 = require('./registry/researchObjectsRegistryComponent');
var researchObjectCard_1 = require('./card/researchObjectCard');
var materialsRegistryComponent_1 = require('./registry/materialsRegistryComponent');
var materialCard_1 = require('./card/materialCard');
var etalonSpectrsRegistryComponent_1 = require('./registry/etalonSpectrsRegistryComponent');
var etalonSpectrCard_1 = require('./card/etalonSpectrCard');
var multiselectComponent_1 = require('./component/multiselectComponent');
var loginComponent_1 = require('./component/loginComponent');
var ng2_file_upload_1 = require('ng2-file-upload');
var ng2_toasty_1 = require('ng2-toasty');
var ngx_modal_1 = require("ngx-modal");
var router_1 = require('@angular/router');
var loggedInGuard_1 = require('./component/loggedInGuard');
var loggedOutGuard_1 = require('./component/loggedOutGuard');
var authService_1 = require('./service/authService');
var httpClient_1 = require('./service/httpClient');
var dropdownProviderService_1 = require('./service/dropdownProviderService');
var components = [
    topMenuPanel_1.TopMenuPanelComponent,
    basePageStructure_1.BasePageStructureComponent,
    buildMaterialsRegistryComponent_1.BuildMaterialsRegistryComponent,
    buildMaterialCard_1.BuildMaterialCardComponent,
    spectrsRegistryComponent_1.SpectrsRegistryComponent,
    spectrCard_1.SpectrCardComponent,
    materialsRegistryComponent_1.MaterialsRegistryComponent,
    materialCard_1.MaterialCardComponent,
    researchObjectsRegistryComponent_1.ResearchObjectsRegistryComponent,
    researchObjectCard_1.ResearchObjectCardComponent,
    etalonSpectrsRegistryComponent_1.EtalonSpectrsRegistryComponent,
    etalonSpectrCard_1.EtalonSpectrCardComponent,
    multiselectComponent_1.MutliSelectDropdownComponent,
    loginComponent_1.LoginComponent
];
var appRoutes = [
    { path: 'login', component: loginComponent_1.LoginComponent, canActivate: [loggedOutGuard_1.LoggedOutGuard] },
    { path: 'materials/build', component: buildMaterialsRegistryComponent_1.BuildMaterialsRegistryComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'material/build', component: buildMaterialCard_1.BuildMaterialCardComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'spectrs', component: spectrsRegistryComponent_1.SpectrsRegistryComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'spectr', component: spectrCard_1.SpectrCardComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'researchObjects', component: researchObjectsRegistryComponent_1.ResearchObjectsRegistryComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'researchObject', component: researchObjectCard_1.ResearchObjectCardComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'materials', component: materialsRegistryComponent_1.MaterialsRegistryComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'material', component: materialCard_1.MaterialCardComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'spectrs/etalon', component: etalonSpectrsRegistryComponent_1.EtalonSpectrsRegistryComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: 'spectr/etalon', component: etalonSpectrCard_1.EtalonSpectrCardComponent, canActivate: [loggedInGuard_1.LoggedInGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'materials/build', },
    { path: '**', component: buildMaterialsRegistryComponent_1.BuildMaterialsRegistryComponent, canActivate: [loggedInGuard_1.LoggedInGuard] }
];
// 
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [ngx_modal_1.ModalModule, ng2_toasty_1.ToastyModule.forRoot(), ng2_file_upload_1.FileUploadModule, http_1.HttpModule, forms_1.FormsModule, platform_browser_1.BrowserModule, angular2_datatable_1.DataTableModule, primeng_1.CalendarModule, router_1.RouterModule.forRoot(appRoutes)],
            declarations: [components],
            bootstrap: [basePageStructure_1.BasePageStructureComponent],
            providers: [loggedInGuard_1.LoggedInGuard, authService_1.AuthService, loggedOutGuard_1.LoggedOutGuard, httpClient_1.HttpClient, dropdownProviderService_1.DropdownProviderService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map