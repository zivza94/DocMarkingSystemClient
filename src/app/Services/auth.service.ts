import { Injectable } from '@angular/core';
import { SharedDataService } from './shared-data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(JSON.parse(sessionStorage.getItem('loggedIn')|| 'false'))
  constructor(private sharedDataService:SharedDataService) { }
  currentLoggedIn = this.loggedInStatus.asObservable()
  
  setLoggedIn(value:boolean){
    this.loggedInStatus.next(value)
    sessionStorage.setItem('loggedIn', value.toString())
  }
  login(userID:string){
    this.setLoggedIn(true)
    sessionStorage.setItem('userID',userID)
  }
  logout(){
    this.setLoggedIn(false)
    sessionStorage.removeItem('userID')
  }
  get isLoggedIn(){
    var retval = JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus.toString())
    if(retval == true){
      this.sharedDataService.changeUserID(sessionStorage.getItem('userID'))
    }
    return retval
  }

}
