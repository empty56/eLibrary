import { Component,OnInit } from '@angular/core';
import { Account } from '../../entities/account';
import { CurrentUserService } from '../../services/current-user.service';
import { Book } from 'src/app/entities/book';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  account: Account;
  isSearched: boolean = false;
  isLoggedIn: boolean;
  ngOnInit(): void {
    this.getCurrentAccount();
    this.authService.isLoggedIn$.subscribe((data)=>{
      this.isLoggedIn = data;
    })
  }

  constructor(
    private currentUserService: CurrentUserService,
    private authService: AuthService
) {}

  destroy: ReplaySubject<any> = new ReplaySubject<any>();

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }


  private getCurrentAccount() {
    this.currentUserService.currentUser$.subscribe((data) => {
      this.account = data;
    });
  }
  searchBooks: Book[];
  searchFormControl = new FormControl('');
  searchResult: string;
  getSearchedBooks(search: string) {
    this.searchResult = search;
    this.isSearched = true;
  }
}
