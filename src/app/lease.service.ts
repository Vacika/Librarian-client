import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lease } from './Lease';

@Injectable({
    providedIn: 'root'
})
export class LeaseService {
    baseApi = "/api/leases";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) { }
    getAllLeases():Observable<Lease[]>{
        return this.http.get<Lease[]>(`${this.baseApi}`);
    }

    newLease(id: number): Observable<Lease> {
        return this.http.post<Lease>(`${this.baseApi}/new`, { "id": id });
    };

    searchLeasesByUsername(username: string):Observable<Lease[]> {
        return this.http.get<Lease[]>(`${this.baseApi}/user?username=${username}`);
    }

    updateLeaseReturned(id:number){
        return this.http.post<Lease>(`${this.baseApi}/update`,{"id":id});
    }

}
