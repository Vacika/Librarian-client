import { Component, OnInit, Input } from '@angular/core';
import { CatalogBook } from '../models/CatalogBook';

@Component({
    selector: 'app-book-snippet',
    templateUrl: './book-snippet.component.html',
    styleUrls: ['./book-snippet.component.css']
})
export class BookSnippetComponent implements OnInit {

    @Input() book: CatalogBook;

    constructor() { }

    ngOnInit() { }

}
