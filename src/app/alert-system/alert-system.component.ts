import { Component, OnInit, Inject } from '@angular/core';
import{ MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-alert-system',
  templateUrl: './alert-system.component.html',
  styleUrls: ['./alert-system.component.css']
})
export class AlertSystemComponent implements OnInit {
  title:string
  message:string
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
