import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SharingCommService } from './sharing-comm.service';
import { GetSharedDocumentsRequest } from 'src/app/DTO/Sharing/get-shared-documents-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetSharedDocumentsService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    GetSharedDocumentsResponseOK: new Subject<any>(),
    GetSharedDocumentsResponseInvalidUserID:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  
  constructor(private sharingCommService:SharingCommService) { }

  get onGetSharedDocumentsOK(){
    return this.ResponseSubjects.GetSharedDocumentsResponseOK
  }
  get onGetSharedDocumentsInvalidUserID(){
    return this.ResponseSubjects.GetSharedDocumentsResponseInvalidUserID
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  GetSharedDocuments(request:GetSharedDocumentsRequest){
    return this.sharingCommService.GetSharedDocuments(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error),
        () => console.log("complete get share documents")
        
    )
  }
}
