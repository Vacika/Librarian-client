import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BookComponent} from './components/book/book/book.component';
import {LeasesListComponent} from './components/leases/leases-list.component';
import {SearchComponent} from './components/search-books/search-books.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material/material.module';
import {NavigationComponent} from './components/navigation/navigation.component';
import {HomeComponent} from './components/home/home.component';
import {BookSnippetComponent} from './components/book/book-snippet/book-snippet.component';
import {BookSnippetListComponent} from './components/book/book-snippet-list/book-snippet-list.component';
import {PopularBooksComponent} from './components/popular-books/popular-books.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {DialogMakeLeaseComponent} from './components/dialogs/dialog-make-lease/dialog-make-lease.component';
import {SearchLeasesComponent} from './components/search-leases/search-leases.component';
import {LoginComponent} from './components/login/login.component';
import {UserDetailsComponent} from './components/user-panel/user.details.component';
import {DialogLeaseDetailComponent} from './components/dialogs/dialog-lease-details/dialog-lease-details.component';
import {ShareBookDialogComponent} from './components/dialogs/dialog-share-book/share-book.component';
import {AuthGuard} from './services/auth.guard';

const appRoutes: Routes = [
    {path: 'book/:id',    component: BookComponent},
    {path: 'home',        component: HomeComponent},
    {path: 'login',       component: LoginComponent},
    {path: 'adminpanel',  component: AdminPanelComponent,  canActivate: [AuthGuard]},
    {path: 'userdetails', component: UserDetailsComponent, canActivate: [AuthGuard]},

    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: HomeComponent}
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
        ShareBookDialogComponent
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
