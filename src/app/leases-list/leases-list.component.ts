import { Component, OnInit, Input } from '@angular/core';
import { Lease } from '../Lease';
import { LeaseService } from '../lease.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialog } from '../dialog-overview-example/dialog-overview-example.component';


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
    term: string;
    searchFailed = false;
    leasesFetchFailed = false;
    displayedColumns: string[] = ['id', 'user','timeOfLease', 'due_time', 'inventoryBook', 'returned'];
    constructor(private service: LeaseService, private dialog:MatDialog) { }

    ngOnInit() {
        this.service.getAllLeases().subscribe(
            l => {
                this.allLeases = l
            },
            error => {
                this.leasesFetchFailed = true
                console.error("Error happened while fetching all leases, data:", error)
            }
        )


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
    isExpired(dueTime: string): boolean {
        return this.currentDate.getTime() > Date.parse(dueTime);
    }
    openDialog(info:any) {
            const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
              width: '500px',
              height:'500px',
              data: {id: info.id, bookTitle:info.inventoryBook.catalogBook.title,
                user:info.user.username, timeLeased:info.timeOfLease,
                dueTime:info.dueTime, returned:info.returned}
            });

            dialogRef.afterClosed().subscribe(result => {
              console.log("RESULT: ", result);
              //TODO: implement service to send request to backend for lease update available
              result? console.log("YAY RETURNED"): console.log("NAY NOT WORKING");
            });
    }
}

