import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewingWSService {
  responseSubject = new Subject<Array<string>>()
  subject:WebSocket 
  constructor() { }
  init(docID:string,userID:string){
    this.subject = new WebSocket(environment.viewingWS+"?id="+userID+"&docID="+docID)
    this.subject.onmessage = (response)=>{
      var data = JSON.parse(response.data)
      this.responseSubject.next(data.users)
    }
  }
  close(){
    if(this.subject != undefined){ 
      this.subject.close()
    }
  }
}
