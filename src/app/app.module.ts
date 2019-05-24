import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { LeasesListComponent } from './leases-list/leases-list.component';
import { SearchComponent } from './search-books/search-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { BookSnippetComponent } from './book-snippet/book-snippet.component';
import { BookSnippetListComponent } from './book-snippet-list/book-snippet-list.component';
import { PopularBooksComponent } from './popular-books/popular-books.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DialogMakeLeaseComponent } from './modal-dialogs/dialog-make-lease/dialog-make-lease.component';
import { SearchLeasesComponent } from './search-leases/search-leases.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user.details.component';
import { DialogLeaseDetailComponent } from './modal-dialogs/dialog-lease-details/dialog-lease-details.component';

const appRoutes: Routes = [
    { path: 'book/:id', component: BookComponent },
    { path: 'home', component: HomeComponent },
    { path: 'adminpanel', component: AdminPanelComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userdetails', component: UserDetailsComponent},
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: '**', component: HomeComponent }
];
@NgModule({
    declarations: [
        AppComponent,
        BookComponent,
        LeasesListComponent,
        SearchComponent,
        NavigationComponent,
        HomeComponent,
        BookSnippetComponent,
        BookSnippetListComponent,
        PopularBooksComponent,
        AdminPanelComponent,
        DialogLeaseDetailComponent,
        DialogMakeLeaseComponent,
        SearchLeasesComponent,
        LoginComponent,
        UserDetailsComponent,
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
    entryComponents: [
        DialogLeaseDetailComponent,
        DialogMakeLeaseComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
