import { Injectable } from '@angular/core';
import { SharingCommService } from './sharing-comm.service';
import { CreateShareRequest } from 'src/app/DTO/Sharing/create-share-request';
import { Observable } from 'rxjs';
import { GetSharedDocumentsRequest } from 'src/app/DTO/Sharing/get-shared-documents-request';
import { GetSharedUsersRequest } from 'src/app/DTO/Sharing/get-shared-users-request';
import { RemoveShareRequest } from 'src/app/DTO/Sharing/remove-share-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiSharingCommService extends SharingCommService {
  CreateShare(request: CreateShareRequest): Observable<any> {
    return this.httpClient.post('api/Sharing/CreateShare',request)
  }
  GetSharedDocuments(request: GetSharedDocumentsRequest): Observable<any> {
    return this.httpClient.post('api/Sharing/GetSharedDocuments',request)
  }
  GetSharedUsers(request: GetSharedUsersRequest): Observable<any> {
    return this.httpClient.post('api/Sharing/GetSharedUsers',request)
  }
  RemoveShare(request: RemoveShareRequest): Observable<any> {
    return this.httpClient.post('api/Sharing/RemoveShare',request)
  }

  constructor(private httpClient:HttpClient) {
    super()
   }
}
