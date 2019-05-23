import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogBook } from './CatalogBook';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    baseApi = '/api/public/books';

    constructor(private http: HttpClient) { }

    searchBooks(term: string): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(`${this.baseApi}/search?title=${term}`);
    }

    getCatalogBooks(): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(this.baseApi);
    }

    getCatalogBookById(id: number): Observable<CatalogBook> {
        return this.http.get<CatalogBook>(`${this.baseApi}/${id}`)
    }
    getPopularCatalogBooks(): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(`${this.baseApi}/popular`);
    }
    getSimilarBooks(bookId: number): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(`${this.baseApi}/similar?bookId=${bookId}`);
    }

}
