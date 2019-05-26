import { Component, OnInit } from '@angular/core';
import { CatalogBook } from '../_models/CatalogBook';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators'
import { FormControl } from '@angular/forms';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-search-books',
    templateUrl: './search-books.component.html',
    styleUrls: ['./search-books.component.css']
})
export class SearchComponent implements OnInit {

    catalogBooks: CatalogBook[];
    searchInput = new FormControl();
    term: string;
    searchFailed: boolean = false;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        // this.apiService.getAllCatalogBooks().subscribe({
        //     next: books => {
        //         this.catalogBooks = books;
        //     },
        // });

        this.searchInput.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(x => this.term = x),
            switchMap(term => {
                console.log(this.term);
                return this.apiService.searchBooks(term);
            }))
            .subscribe(
                book => this.catalogBooks = book,
                error => {
                    this.searchFailed = true,
                        console.error("Something failed while fetching... Error details:", error)
                }
            );
    }

}
