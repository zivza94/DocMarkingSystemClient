import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/shared-data.service';

@Component({
  selector: 'app-documents-home',
  templateUrl: './documents-home.component.html',
  styleUrls: ['./documents-home.component.css']
})
export class DocumentsHomeComponent implements OnInit {
  
  private userID:String
  constructor(private sharedDataService:SharedDataService,private router:Router) { }
  ngOnInit(): void {
    this.sharedDataService.currentUserID.subscribe(id => this.userID = id)
  }
  list(){
    this.router.navigate(['listdocument'])
  }


}
