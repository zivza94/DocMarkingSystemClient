import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/DTO/response';

@Injectable({
  providedIn: 'root'
})
export class MarkerWSService {
  ResponseSubjects: {[response:string]:Subject<any>} = {
    NewMarkerResponse: new Subject<any>(),
    RemoveMarkerResponse: new Subject<any>(),
  }
  subject:WebSocket
  constructor() {
    
   }
  get onNewMarker() {
    return this.ResponseSubjects.NewMarkerResponse
  }
  get onRemoveMarker() {
    return this.ResponseSubjects.RemoveMarkerResponse
  }
  connect(){
    this.subject = new WebSocket(environment.markerWs)
    this.subject.onmessage = (response)=>{
      var data = JSON.parse(response.data)
      var responseSubject = this.ResponseSubjects[data.ResponseType]
      responseSubject.next(data)
    }
  }
  disconnect(){
    this.subject.close()
  }
}
