import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LeaseService {

    baseApi = "http://localhost:8080/leases";

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    };

    constructor(private http: HttpClient) { }

    // makeLease(id: number) {
    //     console.log("[LeaseService] makeLease()");
    //     this.http.post<number>(`${this.baseApi}/new`, id, this.httpOptions);
    // }

    makeLeaseT(id: number): Observable<Object> {
        return this.http.post<Object>(`${this.baseApi}/new`, {"id":id}, this.httpOptions);
    };
}
