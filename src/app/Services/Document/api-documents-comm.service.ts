import { Injectable } from '@angular/core';
import { DocumentsCommService } from './documents-comm.service';
import { CreateDocumentRequest } from 'src/app/DTO/Documents/CreateDocument/create-document-request';
import { Observable } from 'rxjs';
import { GetDocumentRequest } from 'src/app/DTO/Documents/GetDocument/get-document-request';
import { GetDocumentsRequest } from 'src/app/DTO/Documents/GetDocuments/get-documents-request';
import { RemoveDocumentRequest } from 'src/app/DTO/Documents/RemoveDocument/remove-document-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDocumentsCommService extends DocumentsCommService {

  constructor(private httpClient:HttpClient) { 
    super()
  }

  CreateDocument(request: CreateDocumentRequest): Observable<any> {
    return this.httpClient.post("api/Document/CreateDocument",request)
  }
  GetDocument(request: GetDocumentRequest): Observable<any> {
    return this.httpClient.post("api/Document/GetDocument",request) 
   }
  GetDocuments(request: GetDocumentsRequest): Observable<any> {
    return this.httpClient.post("api/Document/GetDocuments",request) 
   }
  RemoveDocument(request: RemoveDocumentRequest): Observable<any> {
    return this.httpClient.post("api/Document/RemoveDocument",request) 
   }

  
}
