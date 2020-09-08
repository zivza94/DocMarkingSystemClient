import { Injectable } from '@angular/core';
import { UsersCommService } from './users-comm.service';
import { LoginRequest } from '../../DTO/Users/Login/login-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RemoveUserRequest } from 'src/app/DTO/Users/RemoveUser/remove-user-request';
import { CreateUserRequest } from 'src/app/DTO/Users/CreateUser/create-user-request';


@Injectable({
  providedIn: 'root'
})
export class ApiUsersCommService extends UsersCommService {
  

  constructor(private httpClient:HttpClient) {
    super();
   }

  Login(request: LoginRequest): Observable<any> {
    return this.httpClient.post("api/User/Login",request)
  }
  RemoveUser(request: RemoveUserRequest): Observable<any> {
    return this.httpClient.post("api/User/RemoveUser",request)
  }
  CreateUser(request: CreateUserRequest): Observable<any> {
    return this.httpClient.post("api/User/CreateUser",request)
  }
}
