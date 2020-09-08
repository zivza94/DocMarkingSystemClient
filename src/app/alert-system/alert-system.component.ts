import { Component, OnInit, Inject } from '@angular/core';
import{ MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-alert-system',
  templateUrl: './alert-system.component.html',
  styleUrls: ['./alert-system.component.css']
})
export class AlertSystemComponent implements OnInit {
  modalTitle: string;
  modalMessage: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    this.modalTitle = data.title;
    this.modalMessage = data.message;
   }

  ngOnInit(): void {
  }

}
