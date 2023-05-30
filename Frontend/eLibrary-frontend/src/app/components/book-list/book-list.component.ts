import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { Account } from 'src/app/entities/account';
import { Book } from 'src/app/entities/book';
import { Link } from 'src/app/entities/link';
import { ApiService } from 'src/app/services/api.service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  @Input() tag: string;

  books: Book[];
  firstHalf : Book[];
  secondHalf : Book[];
  trunc = 100;
  constructor(private dialog: MatDialog, 
    private apiService: ApiService, 
    private currentUserService: CurrentUserService){}
    

  currentUser: Account;
    
  ngOnInit() {
    this.currentUserService.currentUser$.subscribe((currentUser)=>{
      this.currentUser = currentUser;
      
      if(this.tag === "Best rated books")
      {
        this.loadBestRatedBooks();
      }
      else if(this.tag === "Recommendations for you")
      {
        this.loadRecommendedBooks();
      }
    })
  }

  destroy: ReplaySubject<any> = new ReplaySubject<any>();

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  loadBestRatedBooks() {
    this.apiService.getBestRatedBooks().subscribe(
      (books: Book[]) => {
        books.forEach((book) => {
          this.apiService.getBookLink(book.id).subscribe((link: Link) =>{
            book.link = link;
          });
      });
      this.books = books;
      this.firstHalf = this.books.slice(0, 4);
      this.secondHalf = this.books.slice(4);
    },
      (error) => {
        console.error('Error retrieving book list:', error);
      }
    );
  }

  loadRecommendedBooks() {
    if(this.currentUser)
    {
      this.apiService.getRecommendedBooks(this.currentUser.id).subscribe(
        (books: Book[]) => {
          books.forEach((book) => {
            this.apiService.getBookLink(book.id).subscribe((link: Link) =>{
              book.link = link;
            });
        });
        this.books = books;
        this.firstHalf = this.books;
        this.secondHalf = null;
      },
        (error) => {
          console.error('Error retrieving book list:', error);
        }
      );
    }
  }
}