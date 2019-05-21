import { Component, OnInit } from '@angular/core';
import { Lease } from '../Lease';
import { LeaseService } from '../lease.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
    leases: Lease[];
    currentDate = new Date();
    searchInput = new FormControl();
    term: string;
    searchFailed = false;
    leasesFetchFailed = false;
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
    isExpired(l: Lease): boolean {
        return this.currentDate.getTime() > Date.parse(l.due_time);
    }

}
