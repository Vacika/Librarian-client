import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, pipe, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../domain/User';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    isAuthenticated = Observable.create();
    user: Observable<User>;
    redirectUrl: string;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<User> {
        const credentials = btoa(username + ':' + password);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}`
        });

        return this.http.get<User>('/api/auth/login', {headers}).pipe(
            map(value => {
                this.isAuthenticated = true;
                return value;
            }),
            catchError(error => {
                this.isAuthenticated = false;
                return of(null);
            })
        );
    }

    logout(): Observable<boolean> {
        return this.http.get<boolean>('/api/auth/logout').pipe(
            map(value => {
                this.isAuthenticated = false;
                return value;
            })
        );
    }

    getUser(): Observable<User> {
        if (this.user == null) {
            this.user = this.http.get('/api/auth/user').pipe(
                map(value => {
                    this.isAuthenticated = true;
                    return value;
                }),
                catchError(() => {
                    this.isAuthenticated = false;
                    return of(null);
                }));
        }
        return this.user;
    }
}
