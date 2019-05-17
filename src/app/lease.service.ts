import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogBook } from './CatalogBook';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LeaseService {

    baseApi = "localhost:8080/leases/new";

    constructor(private http: HttpClient) { }

    makeLease(id:number) : Observable<CatalogBook> {
        return this.http.post<CatalogBook>(this.baseApi, id);
    }

 

}
