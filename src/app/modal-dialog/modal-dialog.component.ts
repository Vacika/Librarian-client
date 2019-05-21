import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lease } from '../Lease';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialog  {

    constructor(
        public dialogRef: MatDialogRef<ModalDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Lease) {}

      onNoClick(): void {
        this.dialogRef.close();
      }
}
