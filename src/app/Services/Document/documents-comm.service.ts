import { Injectable } from '@angular/core';
import { CreateDocumentRequest } from 'src/app/DTO/Documents/CreateDocument/create-document-request';
import { Observable } from 'rxjs';
import { GetDocumentRequest } from 'src/app/DTO/Documents/GetDocument/get-document-request';
import { GetDocumentsRequest } from 'src/app/DTO/Documents/GetDocuments/get-documents-request';
import { RemoveDocumentRequest } from 'src/app/DTO/Documents/RemoveDocument/remove-document-request';

@Injectable({
  providedIn: 'root'
})
export abstract class DocumentsCommService {

  constructor() { }

  abstract CreateDocument(request:CreateDocumentRequest):Observable<any>
  abstract GetDocument(request:GetDocumentRequest):Observable<any>
  abstract GetDocuments(request:GetDocumentsRequest):Observable<any>
  abstract RemoveDocument(request:RemoveDocumentRequest):Observable<any>
}
