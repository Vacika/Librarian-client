import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import {CatalogBook} from '../models/CatalogBook';

@Component({
    selector: 'app-popular-books',
    templateUrl: './popular-books.component.html',
    styleUrls: ['./popular-books.component.css']
})
export class PopularBooksComponent implements OnInit {
    popularBooks: CatalogBook[];
    constructor(private service: CatalogService) { }

    ngOnInit() {
        this.fetchPopularBooks()
    }
    fetchPopularBooks():void
    {
        this.service.getPopularCatalogBooks().subscribe(
            books => this.popularBooks = books,
            error => console.error("Failed fetching popular books from the api, error data:", error)
        )
    }

}
