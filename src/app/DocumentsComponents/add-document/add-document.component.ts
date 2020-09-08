import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import {CreateDocumentService} from 'src/app/Services/Document/create-document.service'
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';
import { CreateDocumentRequest } from 'src/app/DTO/Documents/CreateDocument/create-document-request';
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
    private location:Location) { }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.sharedDataService.currentUserID.subscribe(
      id => this.userID = id
    ))
    this.subscriptions.push(
      this.createDocumentService.onCreateDocumentOK.subscribe(
      response => this.location.back()
    ))
    this.subscriptions.push(
      this.createDocumentService.onCreateDocumentInvalidData.subscribe(
      response => console.log("invalid data", response)
    ))
    this.subscriptions.push(
      this.createDocumentService.onResponseError.subscribe(
      response => console.log("Error in add document,  ", response.message)
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
