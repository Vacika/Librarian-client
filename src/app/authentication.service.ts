import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const credentials = btoa(username + ':' + password);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`
        });
        const options = { headers };
        return this.http.get('/api/account/login', options)
            .pipe();
    }


    // login(username: string, password: string): Observable<boolean> {
    //     let params: URLSearchParams = new URLSearchParams();
    //     let headers = new HttpHeaders()
    //         .set('Content-Type', 'application/x-www-form-urlencoded');
    //     params.append("username", username);
    //     params.append("password", password);
    //     return this.http.post<any>('/api/public/login', params.toString(), { headers: headers })
    //         .pipe(
    //             map(_ => true),
    //             catchError(() => of(false))
    //         )
    // }

}
