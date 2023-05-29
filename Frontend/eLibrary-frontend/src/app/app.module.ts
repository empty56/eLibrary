import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentUserService } from './services/current-user.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule} from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import{ PdfViewerModule } from 'ng2-pdf-viewer';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdminMainPageComponent } from './components/admin-main-page/admin-main-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddBookDialogComponent } from './components/add-book-dialog/add-book-dialog.component';
import { ManageBooksDialogComponent } from './components/manage-books-dialog/manage-books-dialog.component';
import { AccountStatusUpdateDialogComponent } from './components/account-status-update-dialog/account-status-update-dialog.component';
import { ManageFeedbackDialogComponent } from './components/manage-feedback-dialog/manage-feedback-dialog.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { UpdateBookDialogComponent } from './components/update-book-dialog/update-book-dialog.component';
import { UpdateLinkDialogComponent } from './components/update-link-dialog/update-link-dialog.component';
import { UploadBookFilesDialogComponent } from './components/upload-book-files-dialog/upload-book-files-dialog.component';
import { LinkListComponentComponent } from './components/link-list-dialog/link-list-component.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { BookListComponent } from './components/book-list/book-list.component';
import { SearchBookListComponent } from './components/search-book-list/search-book-list.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AddReviewDialogComponent } from './components/add-review-dialog/add-review-dialog.component';
import { UpdateReviewDialogComponent } from './components/update-review-dialog/update-review-dialog.component';
import { MyLibraryComponent } from './components/my-library/my-library.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import { TagedBookListComponent } from './components/taged-book-list/taged-book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MainPageComponent,
    AdminMainPageComponent,
    AddBookDialogComponent,
    ManageBooksDialogComponent,
    AccountStatusUpdateDialogComponent,
    ManageFeedbackDialogComponent,
    UpdateBookDialogComponent,
    UpdateLinkDialogComponent,
    UploadBookFilesDialogComponent,
    LinkListComponentComponent,
    BookListComponent,
    SearchBookListComponent,
    BookPageComponent,
    HeaderComponent,
    ReviewsComponent,
    AddReviewDialogComponent,
    UpdateReviewDialogComponent,
    MyLibraryComponent,
    AudioPlayerComponent,
    BookViewerComponent,
    TagedBookListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    PdfViewerModule,
    NgxMatFileInputModule
  ],
  providers: [CurrentUserService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
