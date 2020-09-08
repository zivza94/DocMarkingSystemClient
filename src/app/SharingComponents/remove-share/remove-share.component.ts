import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RemoveShareService } from 'src/app/Services/Sharing/remove-share.service';
import { RemoveShareRequest } from 'src/app/DTO/Sharing/remove-share-request';
import { Share } from 'src/app/DTO/Sharing/share';

@Component({
  selector: 'app-remove-share',
  templateUrl: './remove-share.component.html',
  styleUrls: ['./remove-share.component.css']
})
export class RemoveShareComponent implements OnInit {
  @Input() docID:string
  @Input() ownerID:string
  @Input() userID:string
  @Output() public onRemoved = new EventEmitter();
  subscriptions:Array<Subscription> = new Array<Subscription>()
  constructor(private removeShareService:RemoveShareService) { }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
    console.log("destroy remove share: " + this.docID)
  }
  ngOnInit(): void {
    this.subscriptions.push(this.removeShareService.onRemoveShareOK.subscribe(
      response => {
        console.log("share: " + this.docID+ " removed ")
        this.onRemoved.emit(this.docID)
      }
    ))
    this.subscriptions.push(this.removeShareService.onRemoveShareInvalidID.subscribe(
      response => console.log("invalid share IDs" + response.request)
    ))
    this.subscriptions.push(this.removeShareService.onRemoveShareNotAuthorized.subscribe(
      response => console.log("You are not authorized to remove this share")
    ))
    this.subscriptions.push(this.removeShareService.onResponseError.subscribe(
      response => console.log(response.message)
    ))
  }
  removeShare(){
    var request = new RemoveShareRequest()
    request.userID = this.ownerID
    var share:Share = new Share()
    share.userID = this.userID
    share.docID = this.docID
    request.share = share
    this.removeShareService.RemoveShare(request)
  }

}
