import { Component, OnInit } from '@angular/core';
import { CreateShareService } from 'src/app/Services/Sharing/create-share.service';
import { Share } from 'src/app/DTO/Sharing/share';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-share',
  templateUrl: './create-share.component.html',
  styleUrls: ['./create-share.component.css']
})
export class CreateShareComponent implements OnInit {
  userID:string
  share:Share
  subscriptions:Array<Subscription> = new Array<Subscription>()
  createShare:FormGroup
  constructor(private sharedDataService:SharedDataService,private createShareService:CreateShareService,
    private location:Location) { }

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
      this.createShareService.onCreateShareOK.subscribe(
        response => this.location.back()
      )
    )
    this.subscriptions.push(
      this.createShareService.onCreateShareInvalidID.subscribe(
        
      )
    )
  }

}
