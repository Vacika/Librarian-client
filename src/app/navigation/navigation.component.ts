import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    constructor(private authservice: AuthenticationService) { }

    ngOnInit() {
    }
    logout() {
        this.authservice.logout()
            .subscribe(_ => localStorage.removeItem('currentUser'));
    }
}
