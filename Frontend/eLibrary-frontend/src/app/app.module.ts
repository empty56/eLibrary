import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentUserService } from './current-user.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';
import { ManageBooksDialogComponent } from './manage-books-dialog/manage-books-dialog.component';
import { AccountStatusUpdateDialogComponent } from './account-status-update-dialog/account-status-update-dialog.component';
import { ManageFeedbackDialogComponent } from './manage-feedback-dialog/manage-feedback-dialog.component';

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
    ManageFeedbackDialogComponent
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
    MatDialogModule
  ],
  providers: [CurrentUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
