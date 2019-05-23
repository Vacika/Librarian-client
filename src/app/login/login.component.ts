import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { User } from '../User';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user:User;
    authenticated=true;
    userInfo = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private service: AuthenticationService, private route:Router) { }

    ngOnInit() {
    }

    onSubmit() {
        const user = this.userInfo.value;
        this.service.login(user.username, user.password)
            .subscribe({
                next: user=>{
                    this.user=user;
                    this.route.navigate(['/home']);
                },
                error: err => {
                    this.authenticated=false;
                    console.error("Authentication failed, error:",err)
                }
            });
    }
}
