import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateShareRequest } from 'src/app/DTO/Sharing/create-share-request';
import { GetSharedDocumentsRequest } from 'src/app/DTO/Sharing/get-shared-documents-request';
import { GetSharedUsersRequest } from 'src/app/DTO/Sharing/get-shared-users-request';
import { RemoveShareRequest } from 'src/app/DTO/Sharing/remove-share-request';

@Injectable({
  providedIn: 'root'
})
export abstract class SharingCommService {

  constructor() { }
  abstract CreateShare(request:CreateShareRequest):Observable<any>
  abstract GetSharedDocuments(request:GetSharedDocumentsRequest):Observable<any>
  abstract GetSharedUsers(request:GetSharedUsersRequest):Observable<any>
  abstract RemoveShare(request:RemoveShareRequest):Observable<any>
}
