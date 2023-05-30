import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/entities/book';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ReplaySubject, filter, forkJoin, of, switchMap } from 'rxjs';
import { AccountBook } from 'src/app/entities/account-book';
import { Account } from 'src/app/entities/account';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { Review } from 'src/app/entities/review';
import { AuthService } from 'src/app/services/auth.service';

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
  isLoggedIn:boolean;
  constructor(private route: ActivatedRoute, 
    private authService: AuthService, 
    private apiService: ApiService, 
    private currentUserService: CurrentUserService,
    private router: Router) {}

  ngOnInit() 
  {
    this.route.paramMap.pipe(
      switchMap((params)=> this.apiService.getBook(+params.get('id')))
    ).subscribe((book)=> {
      this.book = book;
      this.authService.isLoggedIn$.subscribe((data) => {
        this.isLoggedIn = data;
      });
      this.apiService.getBookRating(this.book.id).subscribe((rating)=>{
        this.rating = +rating.toFixed(1);
      });
      this.apiService.getBookLink(this.book.id).subscribe((link)=>{
        this.book.link = link;
      });
      if(this.isLoggedIn)
      {
        this.currentUserService.currentUser$.pipe(
          filter((currentUser) => !!currentUser),
          switchMap((user) => forkJoin({ user: of(user), accountBook: this.apiService.getAccountBook(user?.id, book?.id)}))
        ).subscribe(({user, accountBook}) => {
          this.accountBook = accountBook;
          this.accountBook.account = user;
          this.accountBook.book = this.book;
        });
      }
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

  changeFavourite() {
    if(this.isLoggedIn)
    {
      this.accountBook.favourite = !this.accountBook.favourite;
      this.updateAccountBook(this.accountBook);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  changeBookmark() {
    if(this.isLoggedIn)
    {
      this.accountBook.wanted = !this.accountBook.wanted;
      this.updateAccountBook(this.accountBook);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  addToLibrary() {
    if(this.isLoggedIn)
    {
    this.accountBook.bought = !this.accountBook.bought;
    this.updateAccountBook(this.accountBook);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
