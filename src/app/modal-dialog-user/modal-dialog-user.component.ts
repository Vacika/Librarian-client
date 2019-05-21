import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lease } from '../Lease';
import { CatalogBook } from '../CatalogBook';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog-user.component.html',
  styleUrls: ['./modal-dialog-user.component.css']
})
export class ModalDialogUserComponent  {

    constructor(
        public dialogRef: MatDialogRef<ModalDialogUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CatalogBook) {}

      onNoClick(): void {
        this.dialogRef.close();
      }
}
