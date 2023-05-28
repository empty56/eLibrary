import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { Book } from 'src/app/entities/book';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ReplaySubject, filter, forkJoin, mergeAll, of, switchMap, tap } from 'rxjs';
import { AccountBook } from 'src/app/entities/account-book';
import { Account } from 'src/app/entities/account';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { Review } from 'src/app/entities/review';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit{
  account: Account;
  id: number;
  book: Book;
  rating: number;
  accountBook: AccountBook;
  reviews: Review[];
  currentReview: Review = null;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private currentUserService: CurrentUserService) {}

  ngOnInit() 
  {
    this.route.paramMap.pipe(
      switchMap((params)=> this.apiService.getBook(+params.get('id')))
    ).subscribe((book)=> {
      this.book = book;
      this.apiService.getBookRating(this.book.id).subscribe((rating)=>{
        this.rating = +rating.toFixed(1);
      });
      this.apiService.getBookLink(this.book.id).subscribe((link)=>{
        this.book.link = link;
      });
      this.currentUserService.currentUser$.pipe(
        filter((currentUser) => !!currentUser),
        switchMap((user) => forkJoin({ user: of(user), accountBook: this.apiService.getAccountBook(user?.id, book?.id)}))
      ).subscribe(({user, accountBook}) => {
        this.accountBook = accountBook;
        this.accountBook.account = user;
        this.accountBook.book = this.book;
      });
    });
  }

  destroy: ReplaySubject<any> = new ReplaySubject<any>();

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  updateAccountBook(accountBook: AccountBook){
    this.apiService.updateAccountBook(accountBook.id, accountBook).subscribe((response)=>
    {
      this.accountBook = response;
    })
  }

  changeFavourite(){
    this.accountBook.favourite = !this.accountBook.favourite;
    this.updateAccountBook(this.accountBook);
  }
  changeBookmark(){
    this.accountBook.wanted = !this.accountBook.wanted;
    this.updateAccountBook(this.accountBook);
  }
  addToLibrary(){
    this.accountBook.bought = !this.accountBook.bought;
    this.updateAccountBook(this.accountBook);
  }
}
