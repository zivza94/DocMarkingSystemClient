import { Injectable } from '@angular/core';
import { UploadFileRequest } from 'src/app/DTO/upload-file-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class UploadFileCommService {

  constructor() { }
  abstract UploadFile(request:UploadFileRequest):Observable<any>
}
