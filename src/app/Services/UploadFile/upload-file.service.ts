import { Injectable } from '@angular/core';
import { UploadFileCommService } from './upload-file-comm.service';
import { Subject } from 'rxjs';
import { UploadFileRequest } from 'src/app/DTO/upload-file-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  ResponseSubjects:{[responseID:string]:Subject<any>} ={
    UploadFileResponseOK:new Subject<any>(),
    UploadFileResponseNoData: new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private uploadFileCommService:UploadFileCommService) { }
  get onUploadFileOK(){
    return this.ResponseSubjects.UploadFileResponseOK
  }
  get onUploadFileNoData(){
    return this.ResponseSubjects.UploadFileResponseNoData
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }
  UploadFile(request:UploadFileRequest){
    return this.uploadFileCommService.UploadFile(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error)
        
    )
  }
}
