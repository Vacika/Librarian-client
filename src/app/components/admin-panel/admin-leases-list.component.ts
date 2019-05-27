import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { DialogLeaseDetailComponent } from '../dialogs/dialog-lease-details/dialog-lease-details.component';
import { Lease } from '../../domain/Lease';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-admin-leases-list',
    templateUrl: './admin-leases-list.component.html',
    styleUrls: ['./admin-leases-list.component.css']

})
//userLeases
export class AdminLeasesListComponent implements OnInit {

    displayedColumns: string[] = ['email', 'timeOfLease', 'dueTime', 'title', 'returned'];
    leases = new MatTableDataSource<Lease>();
    currentDate = new Date();
    hiddeFinishedLeases: boolean;
    showOnlyExpired:boolean;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;



    constructor(private apiService: ApiService, private dialog: MatDialog) { }

    ngOnInit() {
        this.leases.filterPredicate = (data: Lease, filter: string) => data.user.email.indexOf(filter) != -1;

        this.apiService.getAllLeases().subscribe({
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
        this.leases.filter = filterValue.trim().toLowerCase();
    }

    onSortData(sort: Sort) {
        let data = this.leases.data;
        if (sort.active && sort.direction !== '') {
            data = data.sort((a: Lease, b: Lease) => {
                const isAsc = sort.direction === 'asc';
                switch (sort.active) {
                    case 'title': return this.compare(a.inventoryBook.catalogBook.title, b.inventoryBook.catalogBook.title, isAsc);
                    case 'email': return this.compare(a.user.email,b.user.email,isAsc);
                    default: return 0;
                }
            })
        }
    }
    //method for comparing two strings, returns 0/-1/1 depending on if Asc/Desc
    private compare(a: string, b: string, isAsc: boolean) {
        return (a > b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}

