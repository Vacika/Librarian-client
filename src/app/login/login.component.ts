import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user:User;
    username:string;
    password:string;
    validating=false;
    authenticationFailed=false;
    constructor(private service: AuthenticationService, private route:Router) { }

    ngOnInit() {
    }

    onSubmit() {
        this.validating=true;
        this.service.login(this.username, this.password)
            .subscribe({
                next: user=>{
                    this.user=user;
                    console.log("USER:",this.user);
                    this.validating=false;
                    this.route.navigate(['/home']);
                },
                error: err => {
                    this.authenticationFailed=true;
                    this.validating=false;
                    console.error("Authentication failed, error:",err)

                }
            });
    }
}
