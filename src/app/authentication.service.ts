import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './User';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    apiURI = '/api/public/login';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) : Observable<User> {
        const credentials = btoa(username + ':' + password);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}`
        });
        return this.http.get<User>(this.apiURI, { headers })
    }
}
