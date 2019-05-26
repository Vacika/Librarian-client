import { Component, OnInit } from '@angular/core';
import { CatalogBook } from '../_models/CatalogBook';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-popular-books',
    templateUrl: './popular-books.component.html',
    styleUrls: ['./popular-books.component.css']
})
export class PopularBooksComponent implements OnInit {

    popularBooks: CatalogBook[];

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.fetchPopularBooks()
    }

    fetchPopularBooks() {
        this.apiService.getPopularCatalogBooks().subscribe(
            books => this.popularBooks = books,
            error => console.error("Failed fetching popular books from the api, error data:", error)
        )
    }
}
