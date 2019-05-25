import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
//DODADI USER ZA DA ZNAES DALI LOG IN ILI LOG OUT DA NAPRAJS
export class NavigationComponent implements OnInit {
    username:string;
    password:string;
    invalidLogin:boolean;
    constructor(private authservice: AuthenticationService,private router:Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
    }

    ngOnInit() {
    }
    login(){
        this.authservice.login(this.username,this.password)
        .subscribe({
            next: user=>this.successfullLogin(user),
            error: error=> this.failedLoginProcedure()

        })
    }
    logout() {
        this.authservice.logout()
            .subscribe(_ => localStorage.removeItem('currentUser'));
    }
    //STOPS login menu from hiding
    stopPropagation(event){
        event.stopPropagation();
    }
    failedLoginProcedure(){
        this.invalidLogin=true;
        this.username='';
        this.password='';
    }
    successfullLogin(user:User){
// TODO FOR SPASE: MAKE TO REFRESH PAGE(HIDE THE MENU AFTER SUCCESFULL LOGIN!)
        localStorage.setItem('currentUser',JSON.stringify(user));
        this.router.navigate(['/home']);

    }
}
