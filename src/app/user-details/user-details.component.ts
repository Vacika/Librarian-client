import { Component, OnInit, Input } from '@angular/core';
import { Lease } from '../Lease';
import { User } from '../User';
import { LeaseService } from '../lease.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    userLeases: Lease[];
    @Input() user: User;
    hideFinishedLeases: boolean;
    currentDate = new Date();
    errorFetchingLeases = false;


    constructor(private leaseService: LeaseService) { }

    ngOnInit() {
        this.getUserLeases();
    }
    getUserLeases() {
        this.leaseService.searchLeasesByUsername(this.user.email)
            .subscribe(
                resultArray => this.userLeases = resultArray,
                error => { ///TODO: Visualise this error
                    this.errorFetchingLeases = true;
                    console.log("error:", error);
                }
            )
    }

}
