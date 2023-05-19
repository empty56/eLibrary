import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { ManageBooksDialogComponent } from '../manage-books-dialog/manage-books-dialog.component';
import { AccountStatusUpdateDialogComponent } from '../account-status-update-dialog/account-status-update-dialog.component';
import { ManageFeedbackDialogComponent } from '../manage-feedback-dialog/manage-feedback-dialog.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';
import { Subject, firstValueFrom } from 'rxjs';
import { Account } from '../account';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit{

  account : Account;

  
  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router, private currentUserService: CurrentUserService) {}
  ngOnInit(): void {
      this.getName();
    }
  openAddBooksDialog(): void {
    this.dialog.open(AddBookDialogComponent);
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


  private getName() {
    
    this.currentUserService.currentUser$.subscribe((data) => {
      this.account = data;
    });
  }
}
