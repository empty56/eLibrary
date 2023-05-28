import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../entities/account';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../services/current-user.service';
import { Book } from 'src/app/entities/book';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  account: Account;
  isSearched: boolean = false;
  ngOnInit(): void {
    this.getCurrentAccount();
  }

  constructor(
    private currentUserService: CurrentUserService
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
