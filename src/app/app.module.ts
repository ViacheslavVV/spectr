import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule } from "angular2-datatable";
import { TopMenuPanelComponent } from './topMenuPanel';
import { BasePageStructureComponent } from './basePageStructure';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
//registry imports
import { BuildMaterialsRegistryComponent } from './registry/buildMaterialsRegistryComponent';
import { SpectrsRegistryComponent } from './registry/spectrsRegistryComponent';
import { ResearchObjectsRegistryComponent } from './registry/researchObjectsRegistryComponent';
import { MaterialsRegistryComponent } from './registry/materialsRegistryComponent';
import { EtalonSpectrsRegistryComponent } from './registry/etalonSpectrsRegistryComponent';
import { BuildMaterialCardComponent } from './card/buildMaterialCard';
import { MutliSelectDropdownComponent } from './component/multiselectComponent';
import { LoginComponent } from './component/loginComponent';


import { FileUploadModule } from 'ng2-file-upload';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from "ngx-modal";
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './component/loggedInGuard';
import { AuthService } from './service/authService';

 const components = [
	 TopMenuPanelComponent, 
	 BasePageStructureComponent,
	 BuildMaterialsRegistryComponent, 
	 SpectrsRegistryComponent, 
	 MaterialsRegistryComponent, 
	 ResearchObjectsRegistryComponent, 
	 EtalonSpectrsRegistryComponent,
   BuildMaterialCardComponent,
   MutliSelectDropdownComponent,
   LoginComponent
 ];

 const appRoutes: Routes = [
   { path: 'login', component: LoginComponent},
   { path: 'materials/build', component: BuildMaterialsRegistryComponent },
   { path: 'material/build', component: BuildMaterialCardComponent },
   { path: 'spectrs',      component: SpectrsRegistryComponent , canActivate: [LoggedInGuard]},
   { path: 'researchObjects',      component: ResearchObjectsRegistryComponent },
   { path: 'materials',      component: MaterialsRegistryComponent },
   { path: 'spectrs/etalon',      component: EtalonSpectrsRegistryComponent },
   { path: '', pathMatch: 'full', redirectTo: 'materials/build'}, 
   { path: '**', component: BuildMaterialsRegistryComponent }
 ];
// 
@NgModule({
  imports:      [ ModalModule, ToastyModule.forRoot(), FileUploadModule, HttpModule, FormsModule, BrowserModule, DataTableModule, CalendarModule, RouterModule.forRoot(appRoutes)],
  declarations: [ components ],
  bootstrap:    [ BasePageStructureComponent ],
  providers : [LoggedInGuard, AuthService]
})
export class AppModule { 
}
