import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { ManageBooksDialogComponent } from '../manage-books-dialog/manage-books-dialog.component';
import { AccountStatusUpdateDialogComponent } from '../account-status-update-dialog/account-status-update-dialog.component';
import { ManageFeedbackDialogComponent } from '../manage-feedback-dialog/manage-feedback-dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';
import { Account } from '../../entities/account';
import { UploadBookFilesDialogComponent } from '../upload-book-files-dialog/upload-book-files-dialog.component';
import { LinkListComponentComponent } from '../../link-list-component/link-list-component.component';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit{

  account : Account;

  
  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router, private currentUserService: CurrentUserService) {}
  ngOnInit(): void {
      this.getCurrentAccount();
    }
  openAddBooksDialog(): void {
    this.dialog.open(AddBookDialogComponent);
  }

  openUpdateLinksDialog(): void {
    this.dialog.open(LinkListComponentComponent);
  }


  openUpdateDeleteBooksDialog(): void {
    this.dialog.open(ManageBooksDialogComponent);
  }

  openUserLockUnlockDialog(): void {
    this.dialog.open(AccountStatusUpdateDialogComponent);
  }

  openFeedbackRemovalDialog(): void {
    this.dialog.open(ManageFeedbackDialogComponent);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  private getCurrentAccount() {
    this.currentUserService.currentUser$.subscribe((data) => {
      this.account = data;
    });
  }
}
