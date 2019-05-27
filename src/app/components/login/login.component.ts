import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private authService: AuthenticationService, private route: Router) {

    }

    ngOnInit() {
        this.route.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
    }

    onSubmit() {
        console.log('LoginComponent#onSubmit');
        let c = this.credentials.value;

        this.authService.login(c.username, c.password).subscribe({
            next: () => window.location.href='/home',
            error: error => console.log(`Error occurred: ${error.message}`)
        });
    }
}
