import { Component } from '@angular/core';
import { CatalogService } from './catalog.service';
import { CatalogBook } from './CatalogBook';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'librarian-ui';
    catalogBooks: CatalogBook[];

    constructor(private service: CatalogService) {
    }

    ngOnInit() {
        this.service.getCatalogBooks().subscribe({
            next: books => {
                this.catalogBooks = books;
                console.log(this.catalogBooks);
            }
        })
    }

}
