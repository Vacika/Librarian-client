import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lease } from './Lease';

@Injectable({
    providedIn: 'root'
})
export class LeaseService {

    baseApi = "http://localhost:8080/leases";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) { }

    makeLease(id: number): Observable<Lease> {
        return this.http.post<Lease>(`${this.baseApi}/new`, { "id": id });
    };
    getAllLeases():Observable<Lease[]>{
        return this.http.get<Lease[]>(`${this.baseApi}/all`);
    }
}
