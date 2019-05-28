import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DialogMakeLeaseComponent} from '../../dialogs/dialog-make-lease/dialog-make-lease.component';
import {MatDialog} from '@angular/material';
import {CatalogBook} from '../../../domain/CatalogBook';
import {ShareBookDialogComponent} from '../../dialogs/dialog-share-book/share-book.component';
import {ApiService} from '../../../services/api.service';

// DODADI USER ZA DA ZNAES DALI DA DOZVOLIS LEASE
@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

    bookId: number;
    book: CatalogBook;
    statusLeasing: string;
    similarBooks: CatalogBook[];
    leaseSuccessful = false;
    errorFetching = false;

    constructor(private apiService: ApiService,
                private route: ActivatedRoute,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => this.bookId = params.id);
        this.fetchBookById(this.bookId);
    }

    fetchBookById(id: number) {
        this.bookId = id;
        this.apiService.getCatalogBookById(this.bookId).subscribe(
            book => this.book = book,
            error => this.errorFetching = true
        );
        this.apiService.getSimilarBooks(this.bookId)
            .subscribe(
                books => this.similarBooks = books,
                error => {
                    this.similarBooks = null;
                    console.error(`Failed to fetch books similar to this, error: ${error.message}`);
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
        // TODO: Improve code readibility

        // Logic: If result from dialog is Yes, then make a lease,else return whatever, in this case returns false
        dialogWindow.afterClosed().subscribe(dialogResult => {
            dialogResult ? this.apiService.newLease(dialogResult).subscribe(
                lease => {
                    this.statusLeasing = 'Lease successfull!';
                    this.leaseSuccessful = true;
                },
                error => {
                    if(error.status == 401)
                    {
                        this.statusLeasing='You must be logged in to lease a book!'
                    }
                    else{
                        this.statusLeasing='Error leasing, refresh and try again!'
                    }
                    this.leaseSuccessful = false;
                    console.error('Error details:', error);
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
