import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lease } from '../Lease';

@Component({
  selector: 'app-dialog-overview-example',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./dialog-overview-example.component.css']
})
export class DialogOverviewExampleDialog  {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Lease) {}

      onNoClick(): void {
        this.dialogRef.close();
      }
}
