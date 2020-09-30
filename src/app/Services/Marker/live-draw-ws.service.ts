import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveDrawWSService {
  ResponseSubjects: {[response:string]:Subject<any>} = {
    NewLiveDrawResponse: new Subject<any>(),
    EndLiveDrawResponse: new Subject<any>()
  }
  subject:WebSocket
  constructor() { }
  get onNewDraw() {
    return this.ResponseSubjects.NewLiveDrawResponse
  }
  get onEndDraw() {
    return this.ResponseSubjects.EndLiveDrawResponse
  }
  connect(userID,docID){
    this.subject = new WebSocket(environment.liveDrawWS+"?id="+userID+"&docID="+docID)
    this.subject.onmessage = (response)=>{
      var data = JSON.parse(response.data)
      var responseSubject = this.ResponseSubjects[data.ResponseType]
      responseSubject.next(data)
    }
  }
  disconnect(){
    this.subject.close()
  }
  send(request:any){
    this.subject.send(JSON.stringify(request))
  }
}
