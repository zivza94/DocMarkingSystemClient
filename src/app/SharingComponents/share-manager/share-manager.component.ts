import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Share } from 'src/app/DTO/Sharing/share';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { AlertService } from 'src/app/Services/alert.service';
import { GetSharedUsersService} from 'src/app/Services/Sharing/get-shared-users.service'
import { Document } from 'src/app/DTO/Documents/document';
import { map } from 'rxjs/operators';
import { GetSharedUsersRequest } from 'src/app/DTO/Sharing/get-shared-users-request';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-share-manager',
  templateUrl: './share-manager.component.html',
  styleUrls: ['./share-manager.component.css']
})
export class ShareManagerComponent implements OnInit {
  doc:Document
  selectedShare:Share
  userID:string
  shares:Array<Share>
  subscriptions:Array<Subscription> = new Array<Subscription>()
  //subject = new WebSocket(environment.shareWS)
  @Output() onUpdateShares = new EventEmitter();
  @Output() onSelectShare = new EventEmitter();

  constructor(private getSharedUsersService:GetSharedUsersService,private sharedDataService:SharedDataService,
              private alertService:AlertService,private location:Location,private router:Router
              ,private authService:AuthService) { }
  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
    //this.subject.close()
  }
  ngOnInit(): void {
    /*this.subject.onmessage = (response)=>{
      console.log(response.data)
      this.getShares()
    }*/
    if(!this.authService.isLoggedIn){
      this.router.navigate['home']
    }
    this.subscriptions.push(this.sharedDataService.currentUserID.subscribe(
      id => {
        if(id == undefined){
          this.router.navigate(['login'])
        }
        this.userID = id
        this.subscriptions.push(this.sharedDataService.currentDoc.subscribe(
          doc => {
            if(doc == undefined){
              this.router.navigate(['login'])
            }
            this.doc = doc
            this.getShares()
          }
        ))
      }
    ))
    this.subscriptions.push(
      this.getSharedUsersService.onGetSharedUsersOK.pipe(
        map(response => response.users as Array<string>),
        map(userIDs =>{
          var shares = new Array<Share>()
          userIDs.forEach(userID => {
              var s = new Share()
              s.docID = this.doc.docID
              s.userID = userID
              shares.push(s)
          })
          return shares
        })
      ).subscribe(
      shares => {
        console.log("Get Shared Users ok")
        this.shares = shares
        this.onUpdateShares.emit(this.shares)
      }
    ))
    this.subscriptions.push(
      this.getSharedUsersService.onGetSharedUsersInvalidDocID.subscribe(
      response => {
        this.alertService.openModal("Get Shares" , "Invalid document id")
      }
    ))
    this.subscriptions.push(
      this.getSharedUsersService.onResponseError.subscribe(
      response => this.alertService.openModal("Get shares" , response.message)
    ))
  }
  goBack(){
    this.location.back()
  }
  getShares(){
    var request = new GetSharedUsersRequest()
    request.docID = this.doc.docID
    this.getSharedUsersService.GetSharedUsers(request)
  }
  onSelect(share:Share){
    this.selectedShare = share
    this.onSelectShare.emit(share)
  }
  removed(event){
    console.log(event +" has been removed")
    this.onSelectShare.emit(this.selectedShare)
    this.getShares()
  }

}
