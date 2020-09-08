import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentsCommService } from './documents-comm.service';
import { GetDocumentRequest } from 'src/app/DTO/Documents/GetDocument/get-document-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDocumentService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    GetDocumentResponseOK: new Subject<any>(),
    GetDocumentResponseInvalidDocID:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private documentsCommService:DocumentsCommService) { }
  get onGetDocumentOK(){
    return this.ResponseSubjects.GetDocumentResponseOK
  }
  get onGetDocumentInvalidDocID(){
    return this.ResponseSubjects.GetDocumentResponseInvalidDocID
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  GetDocument(request: GetDocumentRequest){
    return this.documentsCommService.GetDocument(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error)
        
    )
  }
}
