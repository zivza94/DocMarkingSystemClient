import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/DTO/Users/Login/login-request';
import {RemoveUserRequest} from 'src/app/DTO/Users/RemoveUser/remove-user-request'
import {CreateUserRequest} from 'src/app/DTO/Users/CreateUser/create-user-request'
import {Response} from 'src/app/DTO/response'

@Injectable({
  providedIn: 'root'
})
export abstract class UsersCommService {

  constructor() { }
  abstract Login(request:LoginRequest): Observable<any>
  abstract RemoveUser(request:RemoveUserRequest):Observable<any>
  abstract CreateUser(request:CreateUserRequest):Observable<any>
}
