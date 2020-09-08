import { Injectable } from '@angular/core';
import { UsersCommService } from './users-comm.service';
import { Subject } from 'rxjs';
import { CreateUserRequest } from 'src/app/DTO/Users/CreateUser/create-user-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  ResponseSubjects:{[responseID:string]:Subject<any>} ={
    CreateUserResponseOK:new Subject<any>(),
    CreateUserResponseUserIDExist: new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private userCommService:UsersCommService) { }

  get onCreateUserOK(){
    return this.ResponseSubjects.CreateUserResponseOK
  }
  get onCreateUserExist(){
    return this.ResponseSubjects.CreateUserResponseUserIDExist
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }
  CreateUser(request: CreateUserRequest){
    return this.userCommService.CreateUser(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error)
        
    )
  }
}
