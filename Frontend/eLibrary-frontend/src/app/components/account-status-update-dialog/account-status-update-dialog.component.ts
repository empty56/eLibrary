import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialogRef } from '@angular/material/dialog';
import { Account } from '../../entities/account';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-status-update-dialog',
  templateUrl: './account-status-update-dialog.component.html',
  styleUrls: ['./account-status-update-dialog.component.css']
})
export class AccountStatusUpdateDialogComponent implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  accounts: Account[];
  dataSource;
  displayedColumns: string[] = ['id', 'email', 'firstname', 'lastname', 'blocked', 'action'];

  constructor(private accountService: AccountService, private _liveAnnouncer: LiveAnnouncer, private dialogRef: MatDialogRef<AccountStatusUpdateDialogComponent>, private toastr: ToastrService){}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.accountService.getUsers().subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
        this.dataSource = new MatTableDataSource(this.accounts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error retrieving user list:', error);
      }
    );
  }
  toggleUserStatus(account: Account) {
    let accountDetails = new Account();
    accountDetails.blocked = !account.blocked;
    accountDetails.id = account.id;
    accountDetails.firstname = account.firstname;
    accountDetails.lastname = account.lastname;
    this.accountService.updateAccount(accountDetails).subscribe(
      (updateAccount: Account) => {
        this.toastr.success('User status was updated', 'Successfuly updated!');
        this.loadUsers();
      },
      (error) => {
        this.toastr.error(error, 'Error updating user status');
      }
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
