import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Account } from 'src/app/entities/account';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private currentUserService: CurrentUserService,
    private dialog: MatDialog
  ) {}
  
  destroy: ReplaySubject<any> = new ReplaySubject<any>();
  currentUser: Account;
  isLoggedIn: boolean;

  ngOnInit(){
    this.authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.currentUserService.currentUser$.subscribe((data)=>{
      this.currentUser = data
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }


  home() : void {
    this.router.navigateByUrl('/library/myLibrary', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/library']));
  }

  myLibrary() : void {
    if(this.isLoggedIn)
    {
      this.router.navigate(['/library/myLibrary']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  myStats() : void {
    this.router.navigate(['/library/myStatistics']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toLogin(): void {
    this.router.navigate(['/login']);
  }

  toSingUp(): void {
    this.router.navigate(['/signup']);
  }

  settings(currentUser: Account): void {
    this.dialog.open(SettingsDialogComponent);
  }
}
