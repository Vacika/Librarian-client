import { Component, OnInit, Output } from '@angular/core';
import { CatalogBook } from '../CatalogBook';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { FormControl } from '@angular/forms';
import { CatalogService } from '../catalog.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    catalogBooks: CatalogBook[];
    searchInput = new FormControl();
    constructor(private catalogService: CatalogService) { }

    ngOnInit() {
        this.catalogService.getCatalogBooks().subscribe({
            next: books => {
                this.catalogBooks = books;
                // console.log(this.catalogBooks);
            }
        });
        this.searchInput.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(term => {
                return this.catalogService.searchBooks(term);
            }))
            .subscribe(book => this.catalogBooks = book,
                error => console.error("Something failed while fetching... Error details:", error));
    }

}
