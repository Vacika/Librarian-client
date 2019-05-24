import { Component, OnInit, Input } from '@angular/core';
import { Lease } from '../models/Lease';
import { LeaseService } from '../services/lease.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-search-leases',
    templateUrl: './search-leases.component.html',
    styleUrls: ['./search-leases.component.css']
})
export class SearchLeasesComponent implements OnInit {
    searchLeases: Lease[]
    allLeases:Lease[]
    leasesFetchFailed = false
    searchInput = new FormControl()
    hideFinishedLeases:boolean;
    term = '';

    constructor(private service: LeaseService) { }

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
                resultArray => this.searchLeases = resultArray,
                error => {
                    this.leasesFetchFailed = true,
                    console.error("Something failed while fetching... Error details:", error)
                }
            );

    }
    fetchAllLeases() {
        this.service.getAllLeases().subscribe(
            resultArray => {
                this.allLeases = resultArray
            },
            error => {
                this.leasesFetchFailed = true
                console.error("Error happened while fetching all leases, data:", error)
            }
        )
    }
}
