import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

enum shape {rectangle, ellipse}
@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
  
  constructor(private location:Location) { 
  }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
