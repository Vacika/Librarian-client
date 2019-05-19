import { Component, OnInit, Input } from '@angular/core';
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
    @Input() book: CatalogBook;
    // @Input() willRouteTo: RouterLink;

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
        this.leaseService.makeLease(this.bookId).subscribe(
            data => console.log(data),
            error => console.log("Book is not available")
        );
    }

}
