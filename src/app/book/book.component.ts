import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LeaseService } from "../_services/lease.service";
import { CatalogService } from '../_services/catalog.service';
import { DialogMakeLeaseComponent } from '../_dialogs/dialog-make-lease/dialog-make-lease.component';
import { MatDialog } from '@angular/material';
import { CatalogBook } from '../_models/CatalogBook';
import { ShareBookDialogComponent } from '../_dialogs/dialog-share-book/share-book.component';
@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
//DODADI USER ZA DA ZNAES DALI DA DOZVOLIS LEASE
export class BookComponent implements OnInit {
    bookId: number;
    book: CatalogBook;
    statusLeasing: string;
    similarBooks: CatalogBook[];
    leaseSuccessful = false;
    errorFetching = false;

    constructor(private route: ActivatedRoute,
        private leaseService: LeaseService,
        private catalogService: CatalogService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => this.bookId = params['id']);
        this.fetchBookById(this.bookId)
    }
    fetchBookById(id: number) {
        this.bookId = id;
        this.catalogService.getCatalogBookById(this.bookId).subscribe(
            book => this.book = book,
            error => this.errorFetching = true
        );
        this.catalogService.getSimilarBooks(this.bookId)
            .subscribe(
                books => this.similarBooks = books,
                error => {
                    this.similarBooks = null;
                    console.error("Failed to fetch books similar to this, error:", error);
                }
            );
        window.history.replaceState({}, '', `/book/${this.bookId}`); // change route path

    }

    openDialog(book: CatalogBook): void {
        const dialogWindow = this.dialog.open(DialogMakeLeaseComponent, {
            data: {
                id: book.id,
                title: book.title
            }
        });
        //TODO: Improve code readibility

        //Logic: If result from dialog is Yes, then make a lease,else return whatever, in this case returns false
        dialogWindow.afterClosed().subscribe(dialogResult => {
            dialogResult ? this.leaseService.newLease(dialogResult).subscribe(
                lease => {
                    this.statusLeasing = "Lease successfull!";
                    this.leaseSuccessful = true;
                },
                error => {
                    this.statusLeasing = "Error happened while trying to lease this book, please refresh and try again.."
                    this.leaseSuccessful = false;
                    console.error("Error details:", error);
                })
                : false;
        });
    }
    openShareDialog(): void {
        const dialogWindow = this.dialog.open(ShareBookDialogComponent, {
            data: {
                url: `http://localhost:4200/book/${this.bookId}`
            }
        });
    }

}

