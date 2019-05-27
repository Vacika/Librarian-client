import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DialogLeaseDetailComponent } from '../dialogs/dialog-lease-details/dialog-lease-details.component';
import { Lease } from '../../domain/Lease';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-user-leases-list',
    templateUrl: './user-leases-list.component.html',
    styleUrls: ['./user-leases-list.component.css']

})
//userLeases
export class UserLeasesListComponent implements OnInit {

    displayedColumns: string[] = ['inventoryBook', 'timeOfLease', 'dueTime', 'returned'];
    leases = new MatTableDataSource<Lease>();
    hideFinishedLeases: boolean;
    currentDate = new Date();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    constructor(private apiService: ApiService, private dialog: MatDialog) { }

    ngOnInit() {
        this.leases.filterPredicate = (data: Lease, filter: string) => data.inventoryBook.catalogBook.title.toLowerCase().indexOf(filter) != -1;

        this.apiService.getMyLeases().subscribe({
            next: l => {
                this.leases.data = l as Lease[];
                this.leases.paginator = this.paginator;
                this.leases.sort = this.sort;

            },
            error: error => console.log(`Error occurred: ${error.message}`)
        });

    }
    isLeaseExpired(dueTime: string): boolean {
        return this.currentDate.getTime() > Date.parse(dueTime);
    }

    openDialog(info: any) {
        console.log(this.leases);

        const dialogWindow = this.dialog.open(DialogLeaseDetailComponent, {
            data: {
                id: info.id,
                bookTitle: info.inventoryBook.catalogBook.title,
                user: info.user.email,
                timeOfLease: info.timeOfLease,
                dueTime: info.dueTime,
                returned: info.returned
                // role:userrole
            }
        });
        // Dialog result = ID of the lease updated if updated, else dialogResult=undefined
        // dialogresult? update lease : return false
        // Logic: 1.If dialogResult is not undefined, then it has ID of updated lease.Else return false
        //       2.Next we send a request to back-end to update the lease.
        //       3.Next we update our front-end leases array, where we update the 'returned' attribute of the specific lease to 'true'

        dialogWindow.afterClosed().subscribe(dialogResult => {
            dialogResult ? this.apiService.updateLeaseReturned(dialogResult)
                .subscribe(() => this.leases.data.find(lease => lease.id = dialogResult).returned = true)
                : false;
        });
    }

    public doFilter(filterValue: string) {
        this.leases.filter = filterValue.toLowerCase();
    }
}

