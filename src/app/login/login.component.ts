import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user:User;
    authenticated=true;
    credentialsForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private service: AuthenticationService, private route:Router) { }

    ngOnInit() {
    }

    onSubmit() {
        const credentials = this.credentialsForm.value;
        this.service.login(credentials.username, credentials.password)
            .subscribe({
                next: user=>{
                    this.user=user;
                    console.log("USER:",this.user);
                    this.route.navigate(['/home']);
                },
                error: err => {
                    this.authenticated=false;
                    console.error("Authentication failed, error:",err)
                }
            });
    }
}
