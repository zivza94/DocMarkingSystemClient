import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersCommService } from './users-comm.service';
import { RemoveUserRequest } from 'src/app/DTO/Users/RemoveUser/remove-user-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveUserService {

  ResponseSubjects:{[responseID:string]:Subject<any>} ={
    RemoveUserResponseOK:new Subject<any>(),
    RemoveUserResponseUserIDNotExists: new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private userCommService:UsersCommService) { }

  get onRemoveUserOK(){
    return this.ResponseSubjects.RemoveUserResponseOK
  }
  get onRemoveUserNotExist(){
    return this.ResponseSubjects.RemoveUserResponseUserIDNotExists
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }
  RemoveUser(request: RemoveUserRequest){
    return this.userCommService.CreateUser(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error)
        
    )
  }
}
