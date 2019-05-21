import { Component, OnInit, Input } from '@angular/core';
import { Lease } from '../Lease';
import { LeaseService } from '../lease.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-leases-list',
    templateUrl: './leases-list.component.html',
    styleUrls: ['./leases-list.component.css']
})
export class LeasesListComponent implements OnInit {
    leases: Lease[];
    currentDate = new Date();
    searchInput = new FormControl();
    term: string;
    searchFailed = false;
    leasesFetchFailed = false;
    displayedColumns: string[] = ['id', 'timeOfLease','due_time','inventoryBook','returned'];
    constructor(private service: LeaseService) { }

    ngOnInit() {
        this.service.getAllLeases().subscribe(
            l => this.leases = l,
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
    onLeaseClicked(id: number) {
        this.service.searchLeasesByUsername(id).subscribe(
            list => this.leases = list,
            error => console.error("Error:", error)
        )

    }
}

