import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { GetSharedUsersService } from 'src/app/Services/Sharing/get-shared-users.service';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { GetSharedUsersRequest } from 'src/app/DTO/Sharing/get-shared-users-request';
import { Document } from 'src/app/DTO/Documents/document';
import { ViewingWSService } from 'src/app/Services/Viewing/viewing-ws.service';

@Component({
  selector: 'app-currently-viewing',
  templateUrl: './currently-viewing.component.html',
  styleUrls: ['./currently-viewing.component.css'],
  providers: [ViewingWSService]
})
export class CurrentlyViewingComponent implements OnInit {
  @Input() doc:Document
  @Input() userID:string
  users: Array<string>
  constructor(private viewingWSService:ViewingWSService) {}
  ngOnDestroy(): void{
    this.viewingWSService.close()
  }
  ngOnInit(): void {
    if(this.doc!= undefined){
      this.viewingWSService.init(this.doc.docID,this.userID)
      this.viewingWSService.responseSubject.subscribe(
        response => this.users = response
      )
    }
  }
}
