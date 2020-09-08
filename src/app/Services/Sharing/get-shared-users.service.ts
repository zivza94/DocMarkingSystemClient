import { Injectable } from '@angular/core';
import { GetSharedUsersRequest } from 'src/app/DTO/Sharing/get-shared-users-request';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SharingCommService } from './sharing-comm.service';

@Injectable({
  providedIn: 'root'
})
export class GetSharedUsersService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    GetSharedUsersResponseOK: new Subject<any>(),
    GetSharedUsersResponseInvalidDocID:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  
  constructor(private sharingCommService:SharingCommService) { }

  get onGetSharedUsersOK(){
    return this.ResponseSubjects.GetSharedUsersResponseOK
  }
  get onGetSharedUsersInvalidDocID(){
    return this.ResponseSubjects.GetSharedUsersResponseInvalidDocID
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  GetSharedUsers(request:GetSharedUsersRequest){
    return this.sharingCommService.GetSharedUsers(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error),
        () => console.log("complete Get shared users")
        
    )
  }
}
