import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Document } from 'src/app/DTO/Documents/document';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StartViewRequest } from 'src/app/DTO/Documents/WebSocket/start-view-request'
import { EndViewRequest } from 'src/app/DTO/Documents/WebSocket/end-view-request'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { ViewingWSService } from 'src/app/Services/Viewing/viewing-ws.service'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

enum shape {rectangle, ellipse}
@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
  doc:Document 
  userID:string
  subscriptions:Array<Subscription> = new Array<Subscription>() 
  constructor(private router:Router,private authService:AuthService, private sharedDataService:SharedDataService) { 
  }
  ngOnInit(): void {
    if(!this.authService.isLoggedIn){
      this.router.navigate(['home'])
    }
    this.subscriptions.push(this.sharedDataService.currentDoc.subscribe(
      doc =>{
        if(doc == undefined){
          this.router.navigate(['documents'])
        }else{
          this.doc = doc
        }
      } 
    ))
    this.subscriptions.push(this.sharedDataService.currentUserID.subscribe(
      userID => {
        this.userID = userID
      }
    ))
  }

  goBack(){
    this.router.navigate(['documents'])
  }
}
