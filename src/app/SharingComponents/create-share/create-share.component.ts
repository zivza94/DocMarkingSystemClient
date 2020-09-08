import { Component, OnInit, Input } from '@angular/core';
import { CreateShareService } from 'src/app/Services/Sharing/create-share.service';
import { Share } from 'src/app/DTO/Sharing/share';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/Services/alert.service';
import { CreateShareRequest } from 'src/app/DTO/Sharing/create-share-request';

@Component({
  selector: 'app-create-share',
  templateUrl: './create-share.component.html',
  styleUrls: ['./create-share.component.css']
})
export class CreateShareComponent implements OnInit {
  userID:string
  userIDToShare:string
  docID:string
  subscriptions:Array<Subscription> = new Array<Subscription>()
  createShare:FormGroup
  constructor(private sharedDataService:SharedDataService,private createShareService:CreateShareService,
    private location:Location, private alertService:AlertService) { }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.sharedDataService.currentUserID.subscribe(
        userID => this.userID = userID
      )
    )
    this.subscriptions.push(
      this.sharedDataService.currentDoc.subscribe(
        doc => this.docID = doc.docID
      )
    )
    this.subscriptions.push(
      this.createShareService.onCreateShareOK.subscribe(
        response => this.location.back()
      )
    )
    this.subscriptions.push(
      this.createShareService.onCreateShareInvalidID.subscribe(
        response => this.alertService.openModal("CreateShare","invalid ID")
      )
    )
    this.subscriptions.push(
      this.createShareService.onCreateShareNotAuthorized.subscribe(
        response => this.alertService.openModal("Create share","Only the owner of the document allow to create share")
      )
    )
    this.subscriptions.push(
      this.createShareService.onResponseError.subscribe(
        response => this.alertService.openModal("Create share" , response.message)
      )
    )
  }
  onCancel(){
    this.location.back()
  }
  onSubmit(){
    var share:Share = new Share()
    share.docID = this.docID
    share.userID = this.userIDToShare
    var request = new CreateShareRequest()
    request.share = share
    request.userID = this.userID
    this.createShareService.CreateShare(request)

  }

}
