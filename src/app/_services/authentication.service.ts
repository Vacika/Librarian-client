import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../_models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    apiURI = '/api/auth';

    constructor(private http: HttpClient) { }

    login(username: string, password: string):Observable<User>{
        const credentials = btoa(username + ':' + password);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}`
        });
        return this.http.get<User>(`${this.apiURI}/login`, { headers });
    }
    //TODO : Logout user at apiURI/logout
    logout() {
        return this.http.get(`${this.apiURI}/logout`,{});

    }
}
