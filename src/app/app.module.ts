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
import { ModalDialog } from './modal-dialog-admin/modal-dialog.component';
import { ModalDialogUserComponent } from './modal-dialog-user/modal-dialog-user.component';
import { SearchLeasesComponent } from './search-leases/search-leases.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'book/:id', component: BookComponent },
    { path: 'home', component: HomeComponent },
    { path: 'adminpanel', component: AdminPanelComponent },
    { path: 'login', component: LoginComponent },
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
        ModalDialog,
        ModalDialogUserComponent,
        SearchLeasesComponent,
        LoginComponent,
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
        ModalDialog,
        ModalDialogUserComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
