import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../domain/User';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    authCredentials = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    user: User;
    validating = false;
    errorMessage: string;

    constructor(private service: AuthenticationService, private route: Router) {
    }

    ngOnInit() {
    }

    onSubmit() {
        console.log('[LoginComponent] onSubmit()');
        // this.validating = true;
        // this.service.login(this.username, this.password).subscribe({
        //     next: user => {
        //         localStorage.setItem('currentUser', JSON.stringify(user)),
        //             this.validating = false,
        //             this.route.navigate(['/home']);
        //     },
        //     error: _ => {
        //         this.errorMessage = 'Invalid credentials, try again ...',
        //             this.validating = false;
        //     }
        // });
    }
}
