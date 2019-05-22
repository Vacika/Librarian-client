import { Component, OnInit, Input } from '@angular/core';
import { Lease } from '../Lease';
import { LeaseService } from '../lease.service';
import { MatDialog } from '@angular/material';
import { ModalDialog } from '../modal-dialog-admin/modal-dialog.component';

@Component({
    selector: 'app-leases-list',
    templateUrl: './leases-list.component.html',
    styleUrls: ['./leases-list.component.css']

})
export class LeasesListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'user', 'timeOfLease', 'due_time', 'inventoryBook', 'returned'];
    @Input() leases: Lease[]
    @Input() hideFinishedLeases: boolean;
    currentDate = new Date();

    constructor(private service: LeaseService, private dialog: MatDialog) { }

    ngOnInit() {
        console.log(this.leases);
    }

    isLeaseExpired(dueTime: string): boolean {
        return this.currentDate.getTime() > Date.parse(dueTime);
    }

    openDialog(info: any) {
        const dialogWindow = this.dialog.open(ModalDialog, {
            data: {
                id: info.id,
                bookTitle: info.inventoryBook.catalogBook.title,
                user: info.user.username,
                timeOfLease: info.timeOfLease,
                dueTime: info.dueTime,
                returned: info.returned
            }
        });
        //Dialog result = ID of the lease updated if updated, else dialogResult=undefined
        // dialogresult? update lease : return false
        //Logic: 1.If dialogResult is not undefined, then it has ID of updated lease.Else return false
        //       2.Next we send a request to back-end to update the lease.
        //       3.Next we update our front-end leases array, where we update the 'returned' attribute of the specific lease to 'true'

        dialogWindow.afterClosed().subscribe(dialogResult => {
            dialogResult ? this.service.updateLeaseReturned(dialogResult)
                .subscribe(() => this.leases.find(lease => lease.id = dialogResult).returned = true)
                : false
        });
    }
}

