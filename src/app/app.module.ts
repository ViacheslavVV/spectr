import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule } from "angular2-datatable";
import { TopMenuPanelComponent } from './topMenuPanel';
import { BasePageStructureComponent } from './basePageStructure';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { HttpModule, RequestOptions, RequestMethod, Headers} from '@angular/http';
//registry imports
import { BuildMaterialsRegistryComponent } from './registry/buildMaterialsRegistryComponent';
import { BuildMaterialCardComponent } from './card/buildMaterialCard';

import { SpectrsRegistryComponent } from './registry/spectrsRegistryComponent';
import { SpectrCardComponent } from './card/spectrCard';

import { ResearchObjectsRegistryComponent } from './registry/researchObjectsRegistryComponent';

import { MaterialsRegistryComponent } from './registry/materialsRegistryComponent';
import { MaterialCardComponent } from './card/materialCard';

import { EtalonSpectrsRegistryComponent } from './registry/etalonSpectrsRegistryComponent';
import { MutliSelectDropdownComponent } from './component/multiselectComponent';
import { LoginComponent } from './component/loginComponent';



import { FileUploadModule } from 'ng2-file-upload';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from "ngx-modal";
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './component/loggedInGuard';
import { LoggedOutGuard } from './component/loggedOutGuard';
import { AuthService } from './service/authService';
import { HttpClient } from './service/httpClient';
import { DropdownProviderService } from './service/dropdownProviderService';

 const components = [
	 TopMenuPanelComponent, 
	 BasePageStructureComponent,
	 BuildMaterialsRegistryComponent, 
	 SpectrsRegistryComponent,
   SpectrCardComponent, 
	 MaterialsRegistryComponent, 
   MaterialCardComponent,
	 ResearchObjectsRegistryComponent, 
	 EtalonSpectrsRegistryComponent,
   BuildMaterialCardComponent,
   MutliSelectDropdownComponent,
   LoginComponent
 ];

 const appRoutes: Routes = [
   { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
   { path: 'materials/build', component: BuildMaterialsRegistryComponent, canActivate: [LoggedInGuard] },
   { path: 'material/build', component: BuildMaterialCardComponent, canActivate: [LoggedInGuard] },
   { path: 'spectrs',      component: SpectrsRegistryComponent , canActivate: [LoggedInGuard]},
   { path: 'spectr',      component: SpectrCardComponent , canActivate: [LoggedInGuard]},
   { path: 'researchObjects',      component: ResearchObjectsRegistryComponent, canActivate: [LoggedInGuard] },
   { path: 'materials',      component: MaterialsRegistryComponent, canActivate: [LoggedInGuard] },
   { path: 'material',      component: MaterialCardComponent, canActivate: [LoggedInGuard] },
   { path: 'spectrs/etalon',      component: EtalonSpectrsRegistryComponent, canActivate: [LoggedInGuard]  },
   { path: '', pathMatch: 'full', redirectTo: 'materials/build', }, 
   { path: '**', component: BuildMaterialsRegistryComponent, canActivate: [LoggedInGuard]}
 ];
 
// 
@NgModule({
  imports:      [ ModalModule, ToastyModule.forRoot(), FileUploadModule, HttpModule, FormsModule, BrowserModule, DataTableModule, CalendarModule, RouterModule.forRoot(appRoutes)],
  declarations: [ components ],
  bootstrap:    [ BasePageStructureComponent ],
  providers :   [ LoggedInGuard, AuthService, LoggedOutGuard, HttpClient, DropdownProviderService]
})
export class AppModule { 
}
