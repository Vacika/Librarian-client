import { Inject, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lease } from '../../../domain/Lease';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-dialog-lease-details',
    templateUrl: './dialog-lease-details.component.html',
    styleUrls: ['./dialog-lease-details.component.css']
})
export class DialogLeaseDetailComponent implements OnInit {
    userRole: string;
    constructor(
        public dialogRef: MatDialogRef<DialogLeaseDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Lease,
        private service: AuthenticationService) { }

    ngOnInit() {
        this.service.user.subscribe(user => this.userRole = user.authorities[0].authority)
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
