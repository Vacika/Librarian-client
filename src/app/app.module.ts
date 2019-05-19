import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { LeasesListComponent } from './leases-list/leases-list.component';
import { SearchComponent } from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
const appRoutes: Routes = [
  { path: 'book/:id', component: BookComponent},
  { path: 'home', component: SearchComponent },

  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: SearchComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    LeasesListComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
