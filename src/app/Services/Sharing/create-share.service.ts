import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SharingCommService } from './sharing-comm.service';
import { CreateShareRequest } from 'src/app/DTO/Sharing/create-share-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateShareService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    CreateShareResponseOK: new Subject<any>(),
    CreateShareResponseInvalidID:new Subject<any>(),
    CreateShareResponseNotAuthorized:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  
  constructor(private sharingCommService:SharingCommService) { }

  get onCreateShareOK(){
    return this.ResponseSubjects.CreateShareResponseOK
  }
  get onCreateShareInvalidID(){
    return this.ResponseSubjects.CreateShareResponseInvalidID
  }
  get onCreateShareNotAuthorized(){
    return this.ResponseSubjects.CreateShareResponseNotAuthorized
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  CreateShare(request:CreateShareRequest){
    return this.sharingCommService.CreateShare(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error),
        () => console.log("complete create share")
        
    )
  }
}
