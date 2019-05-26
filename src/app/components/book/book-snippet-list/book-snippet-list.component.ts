import { Component, OnInit, Input } from '@angular/core';
import { CatalogBook } from '../../../domain/CatalogBook';

@Component({
    selector: 'app-book-snippet-list',
    templateUrl: './book-snippet-list.component.html',
    styleUrls: ['./book-snippet-list.component.css']
})
export class BookSnippetListComponent implements OnInit {

    @Input() books: CatalogBook[];

    constructor() { }

    ngOnInit() {
    }
}
