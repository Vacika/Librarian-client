import { Component, OnInit, Input } from '@angular/core';
import { Lease } from '../Lease';
import { LeaseService } from '../lease.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ModalDialog } from '../modal-dialog-admin/modal-dialog.component';
@Component({
    selector: 'app-leases-list',
    templateUrl: './leases-list.component.html',
    styleUrls: ['./leases-list.component.css']

})
export class LeasesListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'user', 'timeOfLease', 'due_time', 'inventoryBook', 'returned'];
    @Input() leases:Lease[]
    @Input() hideFinishedLeases:boolean;
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

        dialogWindow.afterClosed().subscribe(dialogResult => {
            dialogResult ? this.service.updateLeaseReturned(dialogResult)
                .subscribe(
                //todo Add refresh leases(fetch all leases via eventEmitter)
                )
                : false
        });
    }
}

