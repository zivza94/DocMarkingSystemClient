import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersCommService } from './users-comm.service';
import { LoginRequest } from 'src/app/DTO/Users/Login/login-request';
import { map } from 'rxjs/operators';
import { CompileTemplateMetadata } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  ResponseSubjects:{[responseID:string]:Subject<any>} ={
    LoginResponseOK:new Subject<any>(),
    LoginResponseInvalidUserID: new Subject<any>(),
    AppResponseError: new Subject<any>()
  }

  constructor(private commService:UsersCommService) { }

  get onResponseOk(){
    return this.ResponseSubjects.LoginResponseOK
  }
  get onLoginInvalidUserID(){
    return this.ResponseSubjects.LoginResponseInvalidUserID
  }
  get onAppError(){
    return this.ResponseSubjects.AppResponseError
  }

  Login(request: LoginRequest){
    return this.commService.Login(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => {
          subject.next(data)
        },
        error => this.ResponseSubjects.AppResponseError.next(error),
        () =>{
          //this.ResponseSubjects.LoginResponseOK.complete()
        }
        
    )
  }
}
