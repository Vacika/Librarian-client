import { Component, OnInit, Input } from '@angular/core';
import { Lease } from '../_models/Lease';
import { User } from '../_models/User';
import { LeaseService } from '../_services/lease.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    userLeases: Lease[];
    // @Input() user: User;
    hideFinishedLeases: boolean;
    currentDate = new Date();
    errorFetchingLeases = false;

    constructor(private leaseService: LeaseService) { }

    ngOnInit() {
        this.getUserLeases();
    }

    getUserLeases(): void {

        // this.leaseService.searchLeasesByUsername(this.user.email)
        this.leaseService.searchLeasesByUsername("jsnow@jsnow.com")
            .subscribe(
                resultArray => this.userLeases = resultArray,
                error => { ///TODO: Visualise this error
                    this.errorFetchingLeases = true;
                    console.log("Fetching leases error:", error);
                }
            );
    }
}
