import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lease } from '../../_models/Lease';
import { CatalogBook } from '../../_models/CatalogBook';

@Component({
  selector: 'app-dialog-make-lease',
  templateUrl: './dialog-make-lease.component.html',
  styleUrls: ['./dialog-make-lease.component.css']
})
export class DialogMakeLeaseComponent  {

    constructor(
        public dialogRef: MatDialogRef<DialogMakeLeaseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CatalogBook) {}

      onNoClick(): void {
        this.dialogRef.close();
      }
}
