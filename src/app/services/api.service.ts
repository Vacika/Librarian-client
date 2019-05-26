import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lease } from '../domain/Lease';
import { CatalogBook } from '../domain/CatalogBook';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getAllLeases(): Observable<Lease[]> {
        return this.http.get<Lease[]>(`/api/leases`);
    }

    newLease(id: number): Observable<Lease> {
        return this.http.post<Lease>(`/api/leases/new`, { id });
    }

    searchLeasesByUsername(email: string): Observable<Lease[]> {
        return this.http.get<Lease[]>(`/api/leases/user?email=${email}`);
    }

    updateLeaseReturned(id: number): Observable<Lease> {
        return this.http.post<Lease>(`/api/leases/update`, { id });
    }

    getMyLeases(): Observable<Lease[]> {
        return this.http.get<Lease[]>(`/api/leases/my`);
    }

    getAllCatalogBooks(): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(`/api/public/books`);
    }

    searchBooks(term: string): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(`/api/public/books/search?title=${term}`);
    }

    getCatalogBookById(id: number): Observable<CatalogBook> {
        return this.http.get<CatalogBook>(`/api/public/books/${id}`);
    }

    getPopularCatalogBooks(): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(`/api/public/books/popular`);
    }

    getSimilarBooks(bookId: number): Observable<CatalogBook[]> {
        return this.http.get<CatalogBook[]>(`/api/public/books/similar?bookId=${bookId}`);
    }
}
