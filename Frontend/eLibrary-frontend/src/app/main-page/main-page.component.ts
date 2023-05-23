import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  account : Account;

  ngOnInit(): void {
    this.getCurrentAccount();
  }

  constructor(private authService: AuthService, private router: Router, private currentUserService: CurrentUserService) {}


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
