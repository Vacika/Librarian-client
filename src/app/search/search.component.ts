import { Component, OnInit } from '@angular/core';
import { CatalogBook } from '../CatalogBook';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators'
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
    term: string;
    searchFailed:boolean=false;

    constructor(private catalogService: CatalogService) { }

    ngOnInit() {
        this.catalogService.getCatalogBooks().subscribe({
            next: books => {
                this.catalogBooks = books;
            },
        }); // DO I NEED THIS??
        this.searchInput.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(x => this.term = x),
            switchMap(term => {
                console.log(this.term);
                return this.catalogService.searchBooks(term);
            }))
            .subscribe(
                book => this.catalogBooks = book,
                error => {
                    this.searchFailed=true,
                    console.error("Something failed while fetching... Error details:", error)}
                );


    }

}
