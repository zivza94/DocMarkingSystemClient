import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {User} from 'src/app/DTO/Users/user'
import {CreateUserService} from 'src/app/Services/User/create-user.service'
import { CreateUserRequest } from '../DTO/Users/CreateUser/create-user-request';
import { SharedDataService } from '../Services/shared-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  registerMsg: string = ""
  errorMsg: string = ""
  subscriptions:Array<Subscription> = new Array<Subscription>()
  constructor(private createUserService: CreateUserService,
    private sharedDataService:SharedDataService,
    private router:Router ) { }
  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
  }
    
  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        userID: new FormControl(),
        username: new FormControl()
      }
    )
    this.subscriptions.push(this.createUserService.onCreateUserOK.subscribe(
      response => {
        console.log("Create user Ok", response.request)
        this.sharedDataService.changeUserID(response.request.user.userID)
        this.router.navigate(['documents'])
      }
    ))
    this.subscriptions.push(this.createUserService.onCreateUserExist.subscribe(
      response => console.log("User exist", response.request)
    ))
    this.subscriptions.push(this.createUserService.onResponseError.subscribe(
      response => console.log("Error accord",response.message )
    ))

  }

  onSubmit() {
    var user = new User()
    user.userID = this.registerForm.value.userID
    user.userName = this.registerForm.value.username
    var request = new CreateUserRequest()
    request.user = user
    this.createUserService.CreateUser(request)
  }

}
