import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../Services/User/login.service'
import { LoginRequest } from '../DTO/Users/Login/login-request';
import {SharedDataService} from "../Services/shared-data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loggedIn: boolean = false
  errorMsg: string = ""
  userID: string
  subscriptions:Array<Subscription> = new Array<Subscription>()
  constructor(private loginService:LoginService, private router:Router, private sharedDataService:SharedDataService) {
    console.log("Constructor")
   }
  
  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        userID: new FormControl()
      }
    )
    this.subscriptions.push(this.loginService.onResponseOk.subscribe(
      response => {

        console.log("Login Ok", response.request)
        this.sharedDataService.changeUserID(response.request.userID)
        this.router.navigate(['documents'])
      },
      () =>console.log("complete loginOK")
    ))

    this.subscriptions.push(this.loginService.onLoginInvalidUserID.subscribe(
      response => {
        this.errorMsg = "Invalid user id"
        console.log("Invalid user ID", response.request)
      }
    ))
    this.subscriptions.push(this.loginService.onAppError.subscribe(
      response => console.log("Error accord",response.message )
    ))

  }
  onSubmit():void {
    var request = new LoginRequest(this.loginForm.value.userID)
    this.loginService.Login(request)
  }

}
