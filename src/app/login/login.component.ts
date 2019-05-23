import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isAuthenticated = false;

    userInfo = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private service: AuthenticationService) { }

    ngOnInit() {
    }

    onSubmit() {
        const u = this.userInfo.value;
        this.service.login(u.username, u.password)
            .subscribe({
                next: ev => {
                    console.log(ev);
                    this.isAuthenticated = ev;
                },
                error: err => console.log(err)
            })
    }
}
