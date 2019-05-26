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
    }

    onSubmit() {
        console.log('LoginComponent#onSubmit');
        let c = this.credentials.value;

        this.authService.login(c.username, c.password).subscribe({
            next: () => this.route.navigateByUrl('/home'),
            error: error => console.log(`Error occurred: ${error.message}`)
        });
    }
}
