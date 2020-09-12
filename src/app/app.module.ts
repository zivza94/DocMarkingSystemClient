import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'
import { UsersCommService } from './Services/User/users-comm.service';
import {ApiUsersCommService} from './Services/User/api-users-comm.service'
import { HttpClientModule } from '@angular/common/http';
import { DocumentsListComponent } from './DocumentsComponents/documents-list/documents-list.component';
import { DocumentsHomeComponent } from './DocumentsComponents/documents-home/documents-home.component';
import { AddDocumentComponent } from './DocumentsComponents/add-document/add-document.component';
import { EditDocumentComponent } from './DocumentsComponents/edit-document/edit-document.component';
import { DocumentsCommService } from './Services/Document/documents-comm.service';
import { ApiDocumentsCommService} from './Services/Document/api-documents-comm.service';
import { RemoveDocumentComponent } from './DocumentsComponents/remove-document/remove-document.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadFileCommService } from './Services/UploadFile/upload-file-comm.service';
import {ApiUploadFileCommService} from './Services/UploadFile/api-upload-file-comm.service';
import { RemoveMarkerComponent } from './MarkersComponents/remove-marker/remove-marker.component';
import { MarkersListComponent } from './MarkersComponents/markers-list/markers-list.component';
import { DrawingMarkersComponent } from './MarkersComponents/drawing-markers/drawing-markers.component';
import { MarkerCommService } from './Services/Marker/marker-comm.service';
import { ApiMarkerCommService} from './Services/Marker/api-marker-comm.service'
import {SharingCommService} from 'src/app/Services/Sharing/sharing-comm.service'
import {ApiSharingCommService} from 'src/app/Services/Sharing/api-sharing-comm.service';
import { RemoveShareComponent } from './SharingComponents/remove-share/remove-share.component';
import { ShareManagerComponent } from './SharingComponents/share-manager/share-manager.component';
import { CreateShareComponent } from './SharingComponents/create-share/create-share.component';
import { AlertSystemComponent } from './alert-system/alert-system.component'
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DocumentsListComponent,
    DocumentsHomeComponent,
    AddDocumentComponent,
    EditDocumentComponent,
    RemoveDocumentComponent,
    UploadFileComponent,
    RemoveMarkerComponent,
    MarkersListComponent,
    DrawingMarkersComponent,
    RemoveShareComponent,
    ShareManagerComponent,
    CreateShareComponent,
    AlertSystemComponent,
    LogoutComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    {provide: UsersCommService, useClass:ApiUsersCommService},
    {provide: DocumentsCommService, useClass:ApiDocumentsCommService},
    {provide: UploadFileCommService, useClass:ApiUploadFileCommService},
    {provide: MarkerCommService, useClass:ApiMarkerCommService},
    {provide: SharingCommService, useClass:ApiSharingCommService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
