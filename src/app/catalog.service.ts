import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogBook } from './CatalogBook';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    baseApi = 'http://localhost:8080/catalog_books';

    constructor(private http: HttpClient) { }

    searchBooks(term:string):Observable<CatalogBook[]>{
        return this.http.get<CatalogBook[]>(`${this.baseApi}/search/book?title=${term}`);
    }
    getCatalogBooks(): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(this.baseApi);
    }
    getCatalogBookById(id:number):Observable<CatalogBook>{
        return this.http.get<CatalogBook>(`${this.baseApi}/${id}`)
    }

}
