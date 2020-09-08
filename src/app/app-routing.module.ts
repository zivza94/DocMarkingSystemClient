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
  {path: "removeMarker",component:RemoveMarkerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
