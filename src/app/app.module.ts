import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { LeasesListComponent } from './leases-list/leases-list.component';
import { SearchComponent } from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
const appRoutes: Routes = [
  { path: 'book/:id', component: BookComponent},
  { path: 'home', component: ListBooksComponent },

  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: ListBooksComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    ListBooksComponent,
    LeasesListComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
