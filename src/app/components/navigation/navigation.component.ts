import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../domain/User';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    isAuthenticated = false;
    user: User;

    constructor(private authService: AuthenticationService, private router: Router) {
    }

    ngOnInit() {
        this.authService.getUser().subscribe({
            next: user => {
                this.user = user;
                this.isAuthenticated = this.user != null;
            }
        });
    }

    onSignOut() {
        this.authService.logout().subscribe({
            next: () => {
                this.isAuthenticated = false;
                window.location.href='/home';
            },
            error: error=> {
                this.isAuthenticated = false;
                window.location.href='/home';
                console.log('error:',error);
            }
        });
    }
}
