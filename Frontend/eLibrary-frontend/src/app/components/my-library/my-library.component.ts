import { Component, Input } from '@angular/core';
import { filter, forkJoin, of, switchMap } from 'rxjs';
import { Account } from 'src/app/entities/account';
import { Book } from 'src/app/entities/book';
import { ApiService } from 'src/app/services/api.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { BookViewerComponent } from '../book-viewer/book-viewer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class MyLibraryComponent {
  currentUser: Account;

  constructor(private currentUserService: CurrentUserService, private apiService: ApiService, private dialog: MatDialog){}

  boughtBooks: Book[] = [];
  readingBooks: Book[] = [];
  readBooks: Book[] = [];
  favouriteBooks: Book[] = [];
  wantedBooks: Book[] = [];

  ngOnInit(){
    this.currentUserService.currentUser$.pipe(
      filter((currentUser) => !!currentUser),
      switchMap((user) => forkJoin({ user: of(user), accountBooks: this.apiService.getAccountBooksByAccount(user?.id), }))
    ).subscribe(({user, accountBooks}) => {
      this.boughtBooks, this.readingBooks, this.readBooks, this.favouriteBooks, this.wantedBooks = [];
      this.currentUser = user;
      let boughtAccountBooks = accountBooks.filter(accountBook => accountBook.bought);
      boughtAccountBooks.forEach(accountBook => {
        this.apiService.getBookLink(accountBook.book.id).subscribe((link)=>{
          accountBook.book.link = link;
        });
        this.boughtBooks.push(accountBook.book);
      });
      let readingAccountBooks = accountBooks.filter(accountBook => accountBook.reading);
      readingAccountBooks.forEach(accountBook => {
        this.apiService.getBookLink(accountBook.book.id).subscribe((link)=>{
          accountBook.book.link = link;
        });
        this.readingBooks.push(accountBook.book)
      });
      let readAccountBooks = accountBooks.filter(accountBook => accountBook.already_read);
      readAccountBooks.forEach(accountBook => {
        this.apiService.getBookLink(accountBook.book.id).subscribe((link)=>{
          accountBook.book.link = link;
        });
        this.readBooks.push(accountBook.book)
      });
      let favouriteAccountBooks = accountBooks.filter(accountBook => accountBook.favourite);
      favouriteAccountBooks.forEach(accountBook => {this.apiService.getBookLink(accountBook.book.id).subscribe((link)=>{
        accountBook.book.link = link;
      });
      this.favouriteBooks.push(accountBook.book)
      });
      let wantedAccountBooks = accountBooks.filter(accountBook => accountBook.wanted);
      wantedAccountBooks.forEach(accountBook => {
        this.apiService.getBookLink(accountBook.book.id).subscribe((link)=>{
          accountBook.book.link = link;
        });
        this.wantedBooks.push(accountBook.book)
      });
    });
  }


}
