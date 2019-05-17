import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LeaseService } from "../lease.service";
import { CatalogService } from '../catalog.service';
import { CatalogBook } from '../CatalogBook';
@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
    bookId: number;
    book: CatalogBook;

    constructor(private route: ActivatedRoute,
        private leaseService: LeaseService,
        private catalogService: CatalogService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => this.bookId = params['id']);
        this.catalogService.getCatalogBookById(this.bookId).subscribe(
            book => this.book = book
        );
        // console.log(this.book.title)
    }

    makeLease() {
        // console.log(this.bookId);
        this.leaseService.makeLeaseT(this.bookId).subscribe(
            data => console.log(data)
        );
    }

}
