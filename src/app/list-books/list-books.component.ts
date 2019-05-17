import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { CatalogBook } from '../CatalogBook';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
   catalogBooks: CatalogBook[];

  constructor(private service:CatalogService) { }

  ngOnInit() {
     this.service.getCatalogBooks().subscribe({
            next: books => {
                this.catalogBooks = books;
                console.log(this.catalogBooks);
            }
        })
  }

}
