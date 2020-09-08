import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentsCommService } from './documents-comm.service';
import { CreateDocumentRequest } from 'src/app/DTO/Documents/CreateDocument/create-document-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateDocumentService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    CreateDocumentResponseOK: new Subject<any>(),
    CreateDocumentResponseInvalidData:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private documentsCommService:DocumentsCommService) { }
  get onCreateDocumentOK(){
    return this.ResponseSubjects.CreateDocumentResponseOK
  }
  get onCreateDocumentInvalidData(){
    return this.ResponseSubjects.CreateDocumentResponseInvalidData
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  CreateDocument(request: CreateDocumentRequest){
    return this.documentsCommService.CreateDocument(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error)
        
    )
  }
}
