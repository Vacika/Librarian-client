import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LeaseService } from "../lease.service";
import { CatalogService } from '../catalog.service';
import { CatalogBook } from '../CatalogBook';
import { ModalDialogUserComponent } from '../modal-dialog-user/modal-dialog-user.component';
import { MatDialog } from '@angular/material';
@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
    bookId: number;
    book: CatalogBook;
    statusLeasing:string;
    similarBooks: CatalogBook[];
    leaseSuccessful=false;

    constructor(private route: ActivatedRoute,
        private leaseService: LeaseService,
        private catalogService: CatalogService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => this.bookId = params['id']);
        this.catalogService.getCatalogBookById(this.bookId).subscribe(
            book => this.book = book
        );
        this.catalogService.getSimilarBooks(this.bookId)
            .subscribe(
                books => this.similarBooks = books
            );
    }

    openDialog(book: CatalogBook) {
        const dialogWindow = this.dialog.open(ModalDialogUserComponent, {
            data: {
                id: book.id,
                title: book.title
            }
        });
//TODO: Improve code readibility
        dialogWindow.afterClosed().subscribe(dialogResult => {
            dialogResult ? this.leaseService.makeLease(dialogResult).subscribe(
                lease=>{
                    this.statusLeasing="Lease successfull!";
                    this.leaseSuccessful=true;
                },
                error=>{
                    this.statusLeasing="Error happened while trying to lease this book, please refresh and try again.."
                    this.leaseSuccessful=false;
                    console.error("Error details:",error);
                })
                : '';
        });
    }
}
