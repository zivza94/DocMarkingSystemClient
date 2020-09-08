import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentsCommService } from './documents-comm.service';
import { RemoveDocumentRequest } from 'src/app/DTO/Documents/RemoveDocument/remove-document-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveDocumentService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    RemoveDocumentResponseOK: new Subject<any>(),
    RemoveDocumentResponseInvalidDocID:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private documentsCommService:DocumentsCommService) { }
  get onRemoveDocumentOK(){
    return this.ResponseSubjects.RemoveDocumentResponseOK
  }
  get onRemoveDocumentInvalidDocID(){
    return this.ResponseSubjects.RemoveDocumentResponseInvalidDocID
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  RemoveDocument(request: RemoveDocumentRequest){
    return this.documentsCommService.RemoveDocument(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error)
        
    )
  }
}
