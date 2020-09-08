import { Injectable } from '@angular/core';
import { UploadFileCommService } from './upload-file-comm.service';
import { HttpClient } from '@angular/common/http';
import { UploadFileRequest } from 'src/app/DTO/upload-file-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUploadFileCommService extends UploadFileCommService {

  constructor(private httpClient:HttpClient) {
    super()
   }

  UploadFile(request:UploadFileRequest):Observable<any> {
    return this.httpClient.post("api/UploadFile/UploadFile",request.formData)
  }
}
