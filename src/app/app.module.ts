import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BookComponent} from './components/book/book/book.component';
import {UserLeasesListComponent} from './components/user-panel/user-leases-list.component';
import {SearchComponent} from './components/search-books/search-books.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material/material.module';
import {NavigationComponent} from './components/navigation/navigation.component';
import {HomeComponent} from './components/home/home.component';
import {BookSnippetComponent} from './components/book/book-snippet/book-snippet.component';
import {BookSnippetListComponent} from './components/book/book-snippet-list/book-snippet-list.component';
import {PopularBooksComponent} from './components/popular-books/popular-books.component';
import {DialogMakeLeaseComponent} from './components/dialogs/dialog-make-lease/dialog-make-lease.component';
import {LoginComponent} from './components/login/login.component';
import {DialogLeaseDetailComponent} from './components/dialogs/dialog-lease-details/dialog-lease-details.component';
import {ShareBookDialogComponent} from './components/dialogs/dialog-share-book/share-book.component';
import {AuthGuard} from './services/auth.guard';
import { AdminLeasesListComponent } from './components/admin-panel/admin-leases-list.component';
const appRoutes: Routes = [
    {path: 'book/:id',    component: BookComponent},
    {path: 'home',        component: HomeComponent},
    {path: 'login',       component: LoginComponent},
    {path: 'adminpanel',  component: AdminLeasesListComponent,  canActivate: [AuthGuard]},
    {path: 'userdetails', component: UserLeasesListComponent, canActivate: [AuthGuard]},

    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: HomeComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        BookComponent,
        UserLeasesListComponent,
        SearchComponent,
        NavigationComponent,
        HomeComponent,
        BookSnippetComponent,
        BookSnippetListComponent,
        PopularBooksComponent,
        DialogLeaseDetailComponent,
        DialogMakeLeaseComponent,
        LoginComponent,
        ShareBookDialogComponent,
        AdminLeasesListComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
        BrowserAnimationsModule,
        MaterialModule
    ],
    entryComponents: [
        DialogLeaseDetailComponent,
        DialogMakeLeaseComponent,
        ShareBookDialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
