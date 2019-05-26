import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../domain/User';
import {Router} from '@angular/router';

// DODADI USER ZA DA ZNAES DALI LOG IN ILI LOG OUT DA NAPRAJS
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    username: string;
    password: string;
    // invalidLogin: boolean;

    constructor(private authService: AuthenticationService, private router: Router) {
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
    }

    login() {
    }

    logout() {
    }

    // STOPS login menu from hiding
    stopPropagation(event) {
        event.stopPropagation();
    }

    // failedLoginProcedure() {
    //     this.invalidLogin = true;
    //     this.username = '';
    //     this.password = '';
    // }

    // successfulLogin(user: User) {
    //     // TODO FOR SPASE: MAKE TO REFRESH PAGE(HIDE THE MENU AFTER SUCCESFULL LOGIN!)
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.router.navigate(['/home']);
    // }
}
