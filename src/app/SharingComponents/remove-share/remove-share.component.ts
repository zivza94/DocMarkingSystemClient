import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RemoveShareService } from 'src/app/Services/Sharing/remove-share.service';
import { RemoveShareRequest } from 'src/app/DTO/Sharing/remove-share-request';
import { Share } from 'src/app/DTO/Sharing/share';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-remove-share',
  templateUrl: './remove-share.component.html',
  styleUrls: ['./remove-share.component.css']
})
export class RemoveShareComponent implements OnInit {
  @Input() userID:string
  @Input() docID:string
  @Input() share:Share
  @Input() ownerID:string
  @Output() public onRemoved = new EventEmitter();
  subscriptions:Array<Subscription> = new Array<Subscription>()
  constructor(private removeShareService:RemoveShareService,
    private alertService:AlertService) { }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
    console.log("destroy remove share: " + this.share.docID)
  }
  ngOnInit(): void {
    this.subscriptions.push(this.removeShareService.onRemoveShareOK.subscribe(
      response => {
        console.log("share: " + this.share.docID+ " removed ")
        this.onRemoved.emit(this.share.docID)
      }
    ))
    this.subscriptions.push(this.removeShareService.onRemoveShareInvalidID.subscribe(
      response => this.alertService.openModal("Remove share" , "Invalid document id or userID")
    ))
    this.subscriptions.push(this.removeShareService.onRemoveShareNotAuthorized.subscribe(
      response => this.alertService.openModal("Remove share" , "You are not authorized to remove this share")
    ))
    this.subscriptions.push(this.removeShareService.onResponseError.subscribe(
      response => this.alertService.openModal("Remove share" , response.error )
    ))
  }
  removeShare(){
    if(this.share == undefined){
      this.share = new Share()
      this.share.userID = this.userID;
      this.share.docID = this.docID
    }
    var request = new RemoveShareRequest()
    request.userID = this.ownerID
    request.share = this.share
    this.removeShareService.RemoveShare(request)
  }

}
