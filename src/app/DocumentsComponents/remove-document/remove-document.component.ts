import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RemoveDocumentService } from 'src/app/Services/Document/remove-document.service';
import { RemoveDocumentRequest } from 'src/app/DTO/Documents/RemoveDocument/remove-document-request';
import { Location } from '@angular/common';
import { Document } from 'src/app/DTO/Documents/document';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-remove-document',
  templateUrl: './remove-document.component.html',
  styleUrls: ['./remove-document.component.css']
})
export class RemoveDocumentComponent implements OnInit {

  @Input() doc:Document
  @Input() userID:string
  @Output() public onRemoved = new EventEmitter();
  subscriptions:Array<Subscription> = new Array<Subscription>()

  constructor(private removeDocumentService:RemoveDocumentService,
              private alertService:AlertService) { }

  
  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
    console.log("destroy remove doc: " + this.doc.documentName)
  }
  ngOnInit(): void {
    this.subscriptions.push(this.removeDocumentService.onRemoveDocumentOK.subscribe(
      response => {
        console.log("doc: " + this.doc.documentName + " removed ")
        this.onRemoved.emit(this.doc)
      }
    ))
    this.subscriptions.push(this.removeDocumentService.onRemoveDocumentInvalidDocID.subscribe(
      response => this.alertService.openModal("Remove Document" , "Invalid document id")
    ))
    this.subscriptions.push(this.removeDocumentService.onResponseError.subscribe(
      response => this.alertService.openModal("Remove Document" , response.message)
    ))
  }
  removeDocument(){
    var request:RemoveDocumentRequest = new RemoveDocumentRequest();
    request.docID = this.doc.docID
    this.removeDocumentService.RemoveDocument(request)
    
  }


}
