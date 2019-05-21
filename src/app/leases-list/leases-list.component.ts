import { Component, OnInit, Input } from '@angular/core';
import { Lease } from '../Lease';
import { LeaseService } from '../lease.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ModalDialog } from '../modal-dialog/modal-dialog.component';


@Component({
    selector: 'app-leases-list',
    templateUrl: './leases-list.component.html',
    styleUrls: ['./leases-list.component.css']
})
export class LeasesListComponent implements OnInit {
    leases: Lease[];
    allLeases: Lease[];
    currentDate = new Date();
    searchInput = new FormControl();
    term: string = '';
    searchFailed = false;
    leasesFetchFailed = false;
    displayedColumns: string[] = ['id', 'user', 'timeOfLease', 'due_time', 'inventoryBook', 'returned'];
    constructor(private service: LeaseService, private dialog: MatDialog) { }

    ngOnInit() {
        this.fetchAllLeases();
        this.searchInput.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(x => this.term = x),
            switchMap(term => {
                return this.service.searchLeasesByUsername(term);
            }))
            .subscribe(
                lease => this.leases = lease,
                error => {
                    this.searchFailed = true,
                        console.error("Something failed while fetching... Error details:", error)
                }
            );
    }

    fetchAllLeases(){
        this.service.getAllLeases().subscribe(
            l => {
                this.allLeases = l
            },
            error => {
                this.leasesFetchFailed = true
                console.error("Error happened while fetching all leases, data:", error)
            }
        )
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
                timeLeased: info.timeOfLease,
                dueTime: info.dueTime,
                returned: info.returned
            }
        });

        dialogWindow.afterClosed().subscribe(dialogResult => {
            dialogResult ? this.service.updateLeaseReturned(dialogResult)
                .subscribe(()=>this.fetchAllLeases())
            : false
        });
    }
}

