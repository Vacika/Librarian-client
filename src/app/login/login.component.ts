import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userInfo = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private service: AuthenticationService) { }

    ngOnInit() {
    }

    onSubmit() {
        const user = this.userInfo.value;
        this.service.login(user.username, user.password)
            .subscribe({
                next: val => console.log(val),
                error: err => console.log(err)
            });
    }
}
