import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lease } from '../../models/Lease';

@Component({
    selector: 'app-dialog-lease-details',
    templateUrl: './dialog-lease-details.component.html',
    styleUrls: ['./dialog-lease-details.component.css']
})
export class DialogLeaseDetailComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogLeaseDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Lease) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
