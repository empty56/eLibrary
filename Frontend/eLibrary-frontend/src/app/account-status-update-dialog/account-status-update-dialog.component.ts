import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-status-update-dialog',
  templateUrl: './account-status-update-dialog.component.html',
  styleUrls: ['./account-status-update-dialog.component.css']
})
export class AccountStatusUpdateDialogComponent {
  accounts: Account[];
  constructor(private accountService: AccountService){}
  // ngOnInit() {
  //   this.loadUsers();
  // }

  // loadUsers() {
  //   this.accountService.getUsersByRole('USER').subscribe(
  //     (accounts: Account[]) => {
  //       this.users = users;
  //     },
  //     (error) => {
  //       console.error('Error retrieving user list:', error);
  //     }
  //   );
  // }
  // toggleUserStatus(user: User) {
  //   user.isBlocked = !user.isBlocked;
  //   this.accountService.updateUser(user).subscribe(
  //     (updatedUser: User) => {
  //       console.log('User status updated:', updatedUser);
  //     },
  //     (error) => {
  //       console.error('Error updating user status:', error);
  //     }
  //   );
  // }
}
