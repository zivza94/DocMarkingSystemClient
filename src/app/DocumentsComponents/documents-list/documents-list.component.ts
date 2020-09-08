import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDocumentsService} from 'src/app/Services/Document/get-documents.service'
import { GetDocumentRequest } from 'src/app/DTO/Documents/GetDocument/get-document-request';
import { GetDocumentsRequest } from 'src/app/DTO/Documents/GetDocuments/get-documents-request';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import {Document} from 'src/app/DTO/Documents/document'
import { RemoveDocumentService } from 'src/app/Services/Document/remove-document.service';
import { RemoveDocumentRequest } from 'src/app/DTO/Documents/RemoveDocument/remove-document-request';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  selectedDoc:Document
  userID:string
  documents:Array<Document> = new Array<Document>()
  subscriptions:Array<Subscription> = new Array<Subscription>()
  constructor(private sharedDataService:SharedDataService,
             private getDocumentsService:GetDocumentsService,
             private router:Router,
             private location:Location,
             private alertService:AlertService) { }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
  }
  ngOnInit(): void {
    this.selectedDoc = null
    this.subscriptions.push(this.sharedDataService.currentUserID.subscribe(
      id => {
        this.userID = id
        this.getDocuments()
      }
    ))
    this.subscriptions.push(this.getDocumentsService.onGetDocumentsOK.subscribe(
      response => this.documents = response.documents
    ))
    this.subscriptions.push(
      this.getDocumentsService.onGetDocumentsInvalidUserID.subscribe(
      response => this.alertService.openModal("Get Document" , "Invalid user id")
    ))
    this.subscriptions.push(
      this.getDocumentsService.onResponseError.subscribe(
      response => this.alertService.openModal("Get Document" , response.message)
    ))
  }
  goBack(){
    this.location.back()
  }
  getDocuments(){
    var request:GetDocumentsRequest = new GetDocumentsRequest()
    request.userID = this.userID
    this.getDocumentsService.GetDocuments(request)
  }
  onSelect(doc:Document){
    this.selectedDoc = doc
  }
  public createImgPath = (imageURL:string) => {
    var image = `https://localhost:5001/${imageURL}`;
    return image
  }
  removed(event){
    console.log(event.documentName +" has been removed")
    this.getDocuments()
  }
  editDocument(doc:Document){
    this.sharedDataService.changeDoc(doc)
    this.router.navigate(['editDocument'])
  }
  shareDocument(doc:Document){
    this.sharedDataService.changeDoc(doc)
    this.router.navigate(['shareDocument'])
  }

}
