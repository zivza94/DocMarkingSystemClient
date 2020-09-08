import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertSystemComponent } from '../alert-system/alert-system.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(public dialog: MatDialog) { }

  openModal(title:string, message:string) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title: title,
        message:message
    };
    dialogConfig.minWidth = 400;

    const dialogRef = this.dialog.open(AlertSystemComponent, dialogConfig);
  }
}
