import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { Book } from 'src/app/entities/book';
import { Link } from 'src/app/entities/link';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books: Book[];
  firstHalf : Book[];
  secondHalf : Book[];
  trunc = 100;
  constructor(private dialog: MatDialog, 
    private apiService: ApiService){}
    

  ngOnInit() {
    this.loadBooks();
  }

  destroy: ReplaySubject<any> = new ReplaySubject<any>();

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  loadBooks() {
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
}

