import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentWSService {

  ResponseSubjects: {[response:string]:Subject<any>} = {
    NewDocumentResponse: new Subject<any>(),
    //NewShareResponse: new Subject<any>(),
    RemoveDocumentResponse: new Subject<any>(),
    CurrentlyViewingResponse: new Subject<any>(),
  }
  subject:WebSocket
  constructor() {
    
   }
  get onNewDocument() {
    return this.ResponseSubjects.NewDocumentResponse
  }
  get onRemoveDocument(){
    return this.ResponseSubjects.RemoveDocumentResponse
  }
  get onCurrentlyViewing() {
    return this.ResponseSubjects.CurrentlyViewingResponse
  }
  
  connect(userID:string){
    this.subject = new WebSocket(environment.documentWS+"?id="+userID)
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
