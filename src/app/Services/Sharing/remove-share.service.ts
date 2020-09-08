import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SharingCommService } from './sharing-comm.service';
import { RemoveShareRequest } from 'src/app/DTO/Sharing/remove-share-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveShareService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    RemoveShareResponseOK: new Subject<any>(),
    RemoveShareResponseInvalidID:new Subject<any>(),
    RemoveShareResponseNotAuthorized:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  
  constructor(private sharingCommService:SharingCommService) { }

  get onRemoveShareOK(){
    return this.ResponseSubjects.RemoveShareResponseOK
  }
  get onRemoveShareInvalidID(){
    return this.ResponseSubjects.RemoveShareResponseInvalidID
  }
  get onRemoveShareNotAuthorized(){
    return this.ResponseSubjects.RemoveShareResponseNotAuthorized
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  RemoveShare(request:RemoveShareRequest){
    return this.sharingCommService.RemoveShare(request)
    .pipe(
      map(data => [data,this. ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error),
        () => console.log("complete remove share")
        
    )
  }
}
