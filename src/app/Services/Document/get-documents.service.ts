import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentsCommService } from './documents-comm.service';
import { GetDocumentsRequest } from 'src/app/DTO/Documents/GetDocuments/get-documents-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDocumentsService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    GetDocumentsResponseOK: new Subject<any>(),
    GetDocumentsResponseInvalidUserID:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private documentsCommService:DocumentsCommService) { }
  get onGetDocumentsOK(){
    return this.ResponseSubjects.GetDocumentsResponseOK
  }
  get onGetDocumentsInvalidUserID(){
    return this.ResponseSubjects.GetDocumentsResponseInvalidUserID
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  GetDocuments(request: GetDocumentsRequest){
    return this.documentsCommService.GetDocuments(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error)
        
    )
  }
}
