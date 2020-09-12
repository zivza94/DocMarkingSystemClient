import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {DocumentsListComponent} from './DocumentsComponents/documents-list/documents-list.component'
import {DocumentsHomeComponent} from './DocumentsComponents/documents-home/documents-home.component'
import { AddDocumentComponent } from './DocumentsComponents/add-document/add-document.component';
import { EditDocumentComponent } from './DocumentsComponents/edit-document/edit-document.component';
import { MarkersListComponent } from './MarkersComponents/markers-list/markers-list.component';
import { RemoveMarkerComponent } from './MarkersComponents/remove-marker/remove-marker.component';
import { CreateShareComponent } from './SharingComponents/create-share/create-share.component';
import { ShareManagerComponent } from './SharingComponents/share-manager/share-manager.component';
import { RemoveShareComponent } from './SharingComponents/remove-share/remove-share.component';
import {LogoutComponent} from './logout/logout.component'

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "documents", component:DocumentsHomeComponent},
  {path:"listdocument",component:DocumentsListComponent},
  {path:"adddocument",component:AddDocumentComponent},
  {path:"editDocument",component:EditDocumentComponent},
  {path: "markersList",component:MarkersListComponent},
  {path: "removeMarker",component:RemoveMarkerComponent},
  {path: "shareDocument",component:CreateShareComponent},
  {path: "shareManager",component:ShareManagerComponent},
  {path: "removeShare",component:RemoveShareComponent},
  {path: "logout",component:LogoutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
