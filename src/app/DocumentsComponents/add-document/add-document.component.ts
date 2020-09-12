import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import {CreateDocumentService} from 'src/app/Services/Document/create-document.service'
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';
import { CreateDocumentRequest } from 'src/app/DTO/Documents/CreateDocument/create-document-request';
import { AlertService } from 'src/app/Services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  userID:string
  uploadFileName:string
  fileName:string = ""
  filePath = ""
  subscriptions:Array<Subscription> = new Array<Subscription>()
  createDocument:FormGroup
  constructor(private sharedDataService:SharedDataService, private createDocumentService:CreateDocumentService,
    private location:Location,private alertService:AlertService,private router:Router,private authService:AuthService) { }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
  }
  ngOnInit(): void {
    if(!this.authService.isLoggedIn){
      this.router.navigate(['home'])
    }
    this.subscriptions.push(
      this.sharedDataService.currentUserID.subscribe(
      id => {
        this.userID = id
    }
    ))
    this.subscriptions.push(
      this.createDocumentService.onCreateDocumentOK.subscribe(
      response => this.location.back()
    ))
    this.subscriptions.push(
      this.createDocumentService.onCreateDocumentInvalidData.subscribe(
      response =>  this.alertService.openModal("Create Document" , "Invalid data")
    ))
    this.subscriptions.push(
      this.createDocumentService.onResponseError.subscribe(
      response =>  this.alertService.openModal("Create Document" , response.message)
    ))
  }
  onCancel(){
    this.location.back()
  }
  onSubmit(){
    var request:CreateDocumentRequest = new CreateDocumentRequest()
    if(this.fileName == ""){
      request.documentName = this.uploadFileName
    }else{
      request.documentName = this.fileName
    }

    request.userID = this.userID
    request.imageURL = this.filePath
    this.createDocumentService.CreateDocument(request)
  }
  uploadFinished(event){
    this.filePath = event
  }
  updateFileName(event){
    this.uploadFileName = event
  }
  
}
