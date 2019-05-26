import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';
import {Lease} from '../../domain/Lease';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-search-leases',
    templateUrl: './search-leases.component.html',
    styleUrls: ['./search-leases.component.css']
})
export class SearchLeasesComponent implements OnInit {

    searchLeases: Lease[];
    allLeases: Lease[];
    leasesFetchFailed = false;
    searchInput = new FormControl();
    hideFinishedLeases: boolean;
    term = '';

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.fetchAllLeases();

        this.searchInput.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(x => this.term = x),
            switchMap(term => {
                return this.apiService.searchLeasesByUsername(term);
            }))
            .subscribe(
                resultArray => this.searchLeases = resultArray,
                error => {
                    this.leasesFetchFailed = true;
                    console.error('Something failed while fetching... Error details:', error);
                }
            );

    }

    fetchAllLeases() {
        this.apiService.getAllLeases().subscribe(
            resultArray => {
                this.allLeases = resultArray;
            },
            error => {
                this.leasesFetchFailed = true;
                console.error('Error happened while fetching all leases, data:', error);
            }
        );
    }
}
