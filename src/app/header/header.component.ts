import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.currentLoggedIn.subscribe(
      stat => this.loggedIn = stat
    )
  }

}
